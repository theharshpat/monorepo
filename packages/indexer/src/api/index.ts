import 'reflect-metadata';

import express, { Response } from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import { NonEmptyArray } from 'type-graphql';

import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';

import http from 'http';

import { DB, MsgRequest } from '../core/db';
import { prefix } from '../core/metrics';

import Logger from 'bunyan';
import promBundle from 'express-prom-bundle';

import { register } from 'prom-client';

import {
  resolvers,
  FindUniqueMessagesResolver,
  FindUniqueReplicaResolver,
  FindUniqueTokenResolver,
  FindFirstMessagesResolver,
  FindFirstReplicaResolver,
  FindFirstTokenResolver,
  FindManyMessagesResolver,
  FindManyReplicaResolver,
  FindManyTokenResolver,
  GroupByMessagesResolver,
  GroupByReplicaResolver,
  GroupByTokenResolver,
  ReplicaRelationsResolver,
  TokenOrderByWithRelationInput,
  TokenRelationFilter,
  TokenRelationsResolver,
  ReplicaOrderByRelationAggregateInput,
} from '@generated/type-graphql';
import { buildSchema } from 'type-graphql';
import { randomString } from '../core/utils';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import {
  isProduction,
  useAllResolvers,
  gitCommit,
  metricsPort,
  port,
} from '../config';

function fail(res: Response, code: number, reason: string) {
  return res.status(code).json({ error: reason });
}

export async function run(db: DB, logger: Logger): Promise<void> {
  const app = express();

  if (isProduction) {
    Sentry.init({
      dsn: 'https://27adc9df48434fc7a99dddae76901884@o1081954.ingest.sentry.io/6508171',
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
      ],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });

    // RequestHandler creates a separate execution context using domains, so that every
    // transaction/span/breadcrumb is attached to its own Hub instance
    app.use(Sentry.Handlers.requestHandler());
    // TracingHandler creates a trace for every incoming request
    app.use(Sentry.Handlers.tracingHandler());
  }

  app.use(cors());
  app.disable('x-powered-by');

  const log = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    logger.info(`request to ${req.url}`);
    next();
  };

  app.get('/healthcheck', log, (req, res) => {
    res.send('OK!');
  });

  app.get('/version', log, (_, res) => {
    res.send(gitCommit);
  });

  const resolversToBuild: NonEmptyArray<Function> | NonEmptyArray<string> =
    useAllResolvers
      ? resolvers
      : [
          FindUniqueMessagesResolver,
          FindUniqueReplicaResolver,
          FindUniqueTokenResolver,

          FindFirstMessagesResolver,
          FindFirstReplicaResolver,
          FindFirstTokenResolver,

          FindManyMessagesResolver,
          FindManyReplicaResolver,
          FindManyTokenResolver,

          GroupByMessagesResolver,
          GroupByReplicaResolver,
          GroupByTokenResolver,

          ReplicaRelationsResolver,
          TokenRelationsResolver,
          // additional, may be thrown. [Need to check!]
          TokenOrderByWithRelationInput,
          TokenRelationFilter,
          ReplicaOrderByRelationAggregateInput,
        ];

  const schema = await buildSchema({
    resolvers: resolversToBuild,
    validate: false,
  });

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,

    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground({}),
    ],

    introspection: true,

    context: {
      prisma: db.client,
    },
  });

  app.get('/tx/:tx', log, async (req, res) => {
    const messages = await db.getMessageByEvm(req.params.tx);
    return res.json(messages.map((m) => m.serialize()));
  });

  app.get('/wrongReplicas', log, async (req, res) => {
    const replicas = await db.client.replica.findMany({
      include: { token: true },
    });

    // TODO: filter on the db with the query above
    const sadReplicas = replicas.filter((r) => {
      const t = r.token;
      return (
        t.name !== r.name || t.decimals !== r.decimals || t.symbol !== r.symbol
      );
    });

    return res.json(sadReplicas);
  });

  app.get('/domain/:domain', log, async (req, res) => {
    const { domain: domainStr } = req.params;

    const domainNumber = parseInt(domainStr);

    const domain: number | string = isNaN(domainNumber)
      ? domainStr
      : domainNumber;

    const sdk = db.sdk; // Should not get sdk like that, but it is ok for now
    try {
      const nomadDomain = sdk.getDomain(domain);
      if (nomadDomain) {
        const { name, domain } = nomadDomain;
        res.json({ data: { name, domain } });
        return;
      } else {
        logger.warn(`No domain found for '${domain}'`); // debug
      }
    } catch (e) {
      logger.warn(`Failed getting domain for request '${domain}', error: ${e}`); // debug
    }
    fail(res, 404, 'Domain not found');

    return;
  });

  app.get('/hash/:hash', log, async (req, res) => {
    const message = await db.getMessageByHash(req.params.hash);
    if (!message) return res.status(404).json({});
    return res.json(message.serialize());
  });

  app.get(
    '/tx',
    log,
    async (req: express.Request<{}, {}, {}, MsgRequest>, res) => {
      const { size: sizeStr } = req.query;

      try {
        if (sizeStr && parseInt(sizeStr) > 100)
          return fail(res, 403, 'maximum page size is 30');

        const messages = await db.getMessages(req.query);

        return res.json(messages.map((m) => m.serialize()));
      } catch (e) {
        fail(res, 403, 'something went wrong');
      }
    },
  );

  if (isProduction) {
    // The error handler must be before any other error middleware and after all controllers
    app.use(Sentry.Handlers.errorHandler());
  }

  // Kludge. I don't know how to prevent promBundle from exposing metricsPath
  const metricsPath = '/' + randomString(20); // '/metrics'

  const metricsMiddleware = promBundle({
    httpDurationMetricName: prefix + '_api',
    buckets: [0.1, 0.3, 0.6, 1, 1.5, 2.5, 5],
    includeMethod: true,
    includePath: true,
    metricsPath,
    promRegistry: register,
  });

  new Promise(() => {
    const server = express();

    server.get('/metrics', async (_, res: Response) => {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    });

    logger.info(
      {
        endpoint: `http://0.0.0.0:${metricsPort}/metrics`,
      },
      'Prometheus metrics exposed',
    );

    server.listen(metricsPort);
  });

  app.use(metricsMiddleware);

  await server.start();

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
}
