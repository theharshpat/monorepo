import { NomadContext } from '@nomad-xyz/sdk';
import * as config from '@nomad-xyz/configuration';
import { utils, ethers } from 'ethers'
import NomadModule from './abis/NomadModule.json';
const { abi: NomadModuleABI } = NomadModule;

type Address = string;
type Domain = string | number;

/**
 * The GovernanceContext manages connections to Nomad Governance contracts.
 * It inherits from the {@link MultiProvider} and {@link NomadContext} and
 * ensures that its contracts always use the latest registered providers and
 * signers.
 */
export class GovernanceContext extends NomadContext {
  // private bridges: Map<string, BridgeContracts>;
  private governorModule: Address;
  private govModules: Map<string, Address>;

  constructor(environment: string | config.NomadConfig = 'development') {
    super(environment);

    this.govModules = new Map();
    // TODO: pass into constructor
    this.governorModule = '0x0000'
    this.govModules.set('ethereum', '0x0000');
    this.govModules.set('moonbeam', '0x0000');
  }

  static fromNomadContext(nomadContext: NomadContext): GovernanceContext {
    const context = new GovernanceContext(nomadContext.conf);

    for (const domain of context.domainNumbers) {
      const provider = context.getProvider(domain);
      if (provider) context.registerProvider(domain, provider);

      const signer = context.getSigner(domain);
      if (signer) context.registerSigner(domain, signer);
    }

    return context;
  }

  /**
   * Get the governance module address for a given domain (or undefined)
   *
   * @param nameOrDomain A domain name or number.
   * @returns the module address (or undefined)
   */
  getGovModuleAddr(nameOrDomain: Domain): Address | undefined {
    const domain = this.resolveDomainName(nameOrDomain);
    return this.govModules.get(domain);
  }

  /**
   * Get the governance module address for a given domain (or undefined)
   *
   * @param nameOrDomain A domain name or number.
   * @returns the module address
   */
  mustGetGovModuleAddr(nameOrDomain: Domain): Address {
    const module = this.getGovModuleAddr(nameOrDomain);
    if (!module) {
      throw new Error(`Missing governance module for domain: ${nameOrDomain}`);
    }
    return module;
  }

  getGovModule(nameOrDomain: Domain): ethers.Contract {
    const addr = this.mustGetGovModuleAddr(nameOrDomain);
    return new ethers.Contract(addr, NomadModuleABI);
  }

  async encodeProposalData(): Promise<string> {
    // TODO: pass in props
    const destination = 'ethereum';
    const to: Address = '0x0000000000000000000000000000000000000000'
    const value = 1
    const data = '0x1234'
    const module = this.getGovModule(destination);
    const execTx = await module.populateTransaction.exec(
      to,
      value,
      data
    );
    const encodedExec = utils.serializeTransaction(execTx);

    // TODO: encode dispatch
    return encodedExec
  }

  decodeProposalData() {
    return
  }
}

