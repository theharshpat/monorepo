import { NomadLocator, NomadConfig } from "@nomad-xyz/configuration";
import * as dotenv from 'dotenv';
import { DeployContext } from "../../../deploy/src/DeployContext";
import { HardhatNetwork, Network } from "./network";
import ethers from 'ethers';
import { NonceManager } from "@ethersproject/experimental";
import fs from 'fs';
dotenv.config();
console.log(dotenv.config())

class Env {
    networks: Network[];
    governor: NomadLocator;

    constructor(governor: NomadLocator) {
        this.networks = [];
        this.governor = governor;
    }

    // Adds a network to the array of networks if it's not already there.
    addNetwork(n: Network) {
        if (!this.networks.includes(n)) this.networks.push(n);
    }
    
    // Gets governing network
    get govNetwork(): Network {
        const n = this.networks.find(n => n.domainNumber === this.governor.domain);
        if (!n) throw new Error(`Governing network is not present. GovDomain ${this.governor.domain}, present network domains: ${this.networks.map(n => n.domainNumber).join(', ')}`);
        return n;
    }

    async deployFresh(): Promise<void> {

        console.log(`Deploying!`, JSON.stringify(this.nomadConfig(), null, 4));

        const outputDir = './output';
        const governanceBatch = await this.deployContext.deployAndRelinquish();
        console.log(`Deployed! gov batch:`, governanceBatch);
        
        fs.mkdirSync(outputDir, {recursive: true});
        fs.writeFileSync(
            `${outputDir}/config.json`,
            JSON.stringify(this.deployContext.data, null, 2),
        );
        // if new contracts were deployed,
        const verification = Object.fromEntries(this.deployContext.verification);
        if (Object.keys(verification).length > 0) {
          // output the verification inputs
          fs.writeFileSync(
              `${outputDir}/verification-${Date.now()}.json`,
              JSON.stringify(verification, null, 2),
          );
        }
    }

    async deploy(): Promise<void> {
        if (this.deployedOnce()) {
             
        } else {
             this.deployFresh()
             return
        }

        console.log(`Deploying!`, JSON.stringify(this.nomadConfig(), null, 4));

        const outputDir = './output';
        const governanceBatch = await this.deployContext.deployAndRelinquish();
        console.log(`Deployed! gov batch:`, governanceBatch);

        // outputs config & verification
        fs.mkdirSync(outputDir, {recursive: true});
        fs.writeFileSync(
            `${outputDir}/config.json`,
            JSON.stringify(this.deployContext.data, null, 2),
        );
        // if new contracts were deployed,
        const verification = Object.fromEntries(this.deployContext.verification);
        if (Object.keys(verification).length > 0) {
          // output the verification inputs
          fs.writeFileSync(
              `${outputDir}/verification-${Date.now()}.json`,
              JSON.stringify(verification, null, 2),
          );
        }
    }

    async check(): Promise<void> {
        await this.deployContext.checkDeployment();
        console.log(`CHECKS PASS!`);
    }

    deployedOnce(): boolean {
        return false;
    }

    get deployerKey(): string {
        const DEPLOYERKEY = ``+ process.env.DEPLOYER_PRIVATE_KEY + ``;
        if (!DEPLOYERKEY) {
            throw new Error('Add DEPLOYER_PRIVATE_KEY to .env');
        }
        return DEPLOYERKEY;
    }

    get deployContext(): DeployContext {
        const deployContext = new DeployContext(this.nomadConfig());
        // add deploy signer and overrides for each network
        for (const network of this.networks) {
            const name = network.name;
            const provider = deployContext.mustGetProvider(name);
            const wallet = new ethers.Wallet(this.deployerKey, provider);
            const signer = new NonceManager(wallet);
            deployContext.registerSigner(name, signer);
            deployContext.overrides.set(name, network.deployOverrides);
        }
        return deployContext;
    }
    

    nomadConfig(): NomadConfig {
        return {
            version: 0,
            environment: 'local',
            networks: this.networks.map(n => n.name),
            rpcs: Object.fromEntries(this.networks.map(n => [n.name, n.rpcs])),
            protocol: {governor: this.governor, networks: Object.fromEntries(this.networks.map(n => [n.name, n.domain]))},
            core: Object.fromEntries(this.networks.filter(n => n.isDeployed).map(n => [n.name, n.coreContracts!])),
            bridge: Object.fromEntries(this.networks.filter(n => n.isDeployed).map(n => [n.name, n.bridgeContracts!])),
            agent: Object.fromEntries(this.networks.filter(n => n.isDeployed).map(n => [n.name, n.agentConfig!])),
            bridgeGui: Object.fromEntries(this.networks.filter(n => n.isDeployed).map(n => [n.name, n.bridgeGui!])),
            gas: Object.fromEntries(this.networks.map(n => [n.name, n.gasConfig!])),
        }
    }
}

(async () => {

    // Ups 2 new hardhat test networks tom and jerry to represent home chain and target chain.
    const t = new HardhatNetwork('tom', 1);

    const j = new HardhatNetwork('jerry', 2);

    await Promise.all([
        t.up(),
        j.up(),
    ])
    console.log(`Upped tom and jerry`);

    const le = new Env({domain: t.domainNumber, id: '0x'+'00'.repeat(20)});
    le.addNetwork(t);
    le.addNetwork(j);

    console.log(`Added Tom and Jerry`);

    await le.deploy();

    // let myContracts = le.deploymyproject();
    
})()


