/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Replica, ReplicaInterface } from "../Replica";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_localDomain",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "_processGas",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reserveGas",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "oldRoot",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32[2]",
        name: "newRoot",
        type: "bytes32[2]",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "signature2",
        type: "bytes",
      },
    ],
    name: "DoubleUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldUpdater",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newUpdater",
        type: "address",
      },
    ],
    name: "NewUpdater",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "messageHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        indexed: true,
        internalType: "bytes",
        name: "returnData",
        type: "bytes",
      },
    ],
    name: "Process",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousConfirmAt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newConfirmAt",
        type: "uint256",
      },
    ],
    name: "SetConfirmation",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "timeout",
        type: "uint256",
      },
    ],
    name: "SetOptimisticTimeout",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "homeDomain",
        type: "uint32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "oldRoot",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newRoot",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "Update",
    type: "event",
  },
  {
    inputs: [],
    name: "PROCESS_GAS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RESERVE_GAS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VERSION",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_root",
        type: "bytes32",
      },
    ],
    name: "acceptableRoot",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "committedRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "confirmAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_oldRoot",
        type: "bytes32",
      },
      {
        internalType: "bytes32[2]",
        name: "_newRoot",
        type: "bytes32[2]",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_signature2",
        type: "bytes",
      },
    ],
    name: "doubleUpdate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "homeDomainHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_remoteDomain",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "_updater",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_committedRoot",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_optimisticSeconds",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "localDomain",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "messages",
    outputs: [
      {
        internalType: "enum Replica.MessageStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "optimisticSeconds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "process",
    outputs: [
      {
        internalType: "bool",
        name: "_success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_leaf",
        type: "bytes32",
      },
      {
        internalType: "bytes32[32]",
        name: "_proof",
        type: "bytes32[32]",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "prove",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
      {
        internalType: "bytes32[32]",
        name: "_proof",
        type: "bytes32[32]",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "proveAndProcess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "remoteDomain",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_root",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_confirmAt",
        type: "uint256",
      },
    ],
    name: "setConfirmation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_optimisticSeconds",
        type: "uint256",
      },
    ],
    name: "setOptimisticTimeout",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_updater",
        type: "address",
      },
    ],
    name: "setUpdater",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "state",
    outputs: [
      {
        internalType: "enum NomadBase.States",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_oldRoot",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_newRoot",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "updater",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60e060405234801561001057600080fd5b5060405162003528380380620035288339818101604052606081101561003557600080fd5b50805160208201516040909201516001600160e01b031960e083901b16608052909190620cf85082101561009f576040805162461bcd60e51b815260206004820152600c60248201526b2170726f636573732067617360a01b604482015290519081900360640190fd5b613a988110156100e5576040805162461bcd60e51b815260206004820152600c60248201526b21726573657276652067617360a01b604482015290519081900360640190fd5b60a082905260c081905260805160e01c92506133f96200012f60003980610a4e528061110a5250806110e952806111e15280611879525080610e655280610eb952506133f96000f3fe608060405234801561001057600080fd5b50600436106101a35760003560e01c80638d3638f4116100ee578063b31c01fb11610097578063df034cd011610071578063df034cd01461064a578063e7e7a7b714610652578063f2fde38b1461069d578063ffa1ad74146106d0576101a3565b8063b31c01fb14610588578063c19d93fb1461063a578063d88beda214610642576101a3565b8063961681dc116100c8578063961681dc146105305780639d54f41914610538578063a3f81d681461056b576101a3565b80638d3638f4146104385780638da5cb5b14610459578063928bc4b21461048a576101a3565b806345630b1a11610150578063715018a61161012a578063715018a6146103f657806371bfb7b8146103fe578063885b5e2d1461041b576101a3565b806345630b1a146103385780636188af0e1461034057806367a6771d146103ee576101a3565b80632bbd59ca116101815780632bbd59ca146102b4578063371d3071146102f25780633999266814610330576101a3565b8063088b5ed3146101a857806319d9d21a146101cd57806325e3beda1461029a575b600080fd5b6101cb600480360360408110156101be57600080fd5b50803590602001356106ee565b005b6101cb600480360360a08110156101e357600080fd5b813591602081019181019060808101606082013564010000000081111561020957600080fd5b82018360208201111561021b57600080fd5b8035906020019184600183028401116401000000008311171561023d57600080fd5b91939092909160208101903564010000000081111561025b57600080fd5b82018360208201111561026d57600080fd5b8035906020019184600183028401116401000000008311171561028f57600080fd5b5090925090506107ef565b6102a2610a4c565b60408051918252519081900360200190f35b6102d1600480360360208110156102ca57600080fd5b5035610a70565b604051808260028111156102e157fe5b815260200191505060405180910390f35b61031c600480360361044081101561030957600080fd5b5080359060208101906104200135610a85565b604080519115158252519081900360200190f35b6102a2610ba5565b6102a2610bab565b6101cb600480360361044081101561035757600080fd5b81019060208101813564010000000081111561037257600080fd5b82018360208201111561038457600080fd5b803590602001918460018302840111640100000000831117156103a657600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955092935050506104008201359050610bc5565b6102a2610c51565b6101cb610c57565b6102a26004803603602081101561041457600080fd5b5035610d6e565b6101cb6004803603602081101561043157600080fd5b5035610d80565b610440610e63565b6040805163ffffffff9092168252519081900360200190f35b610461610e87565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b61031c600480360360208110156104a057600080fd5b8101906020810181356401000000008111156104bb57600080fd5b8201836020820111156104cd57600080fd5b803590602001918460018302840111640100000000831117156104ef57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610ea3945050505050565b61044061151f565b6101cb6004803603602081101561054e57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661152b565b61031c6004803603602081101561058157600080fd5b50356115df565b6101cb6004803603606081101561059e57600080fd5b8135916020810135918101906060810160408201356401000000008111156105c557600080fd5b8201836020820111156105d757600080fd5b803590602001918460018302840111640100000000831117156105f957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550611608945050505050565b6102d1611856565b6102a2611877565b61046161189b565b6101cb6004803603608081101561066857600080fd5b5063ffffffff8135169073ffffffffffffffffffffffffffffffffffffffff60208201351690604081013590606001356118b7565b6101cb600480360360208110156106b357600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611a89565b6106d8611c2b565b6040805160ff9092168252519081900360200190f35b6106f6611c30565b73ffffffffffffffffffffffffffffffffffffffff16610714610e87565b73ffffffffffffffffffffffffffffffffffffffff161461079657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b60008281526099602090815260409182902080549084905582518181529182018490528251909285927fe906d465281862f8f37a1bdd7d810e50347f06b0b493701cca6ccb8e6a7b2694929081900390910190a2505050565b600260655474010000000000000000000000000000000000000000900460ff16600281111561081a57fe5b141561088757604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f6661696c65642073746174650000000000000000000000000000000000000000604482015290519081900360640190fd5b604080516020601f86018190048102820181019092528481526108c99188918835918890889081908401838280828437600092019190915250611c3492505050565b8015610918575061091886866001602002013584848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611c3492505050565b801561092957508435602086013514155b15610a4457610936611cc6565b7f2c3f60bab4170347826231b75a920b5053941ddebc6eed6fd2c25721648b186f8686868686866040518087815260200186600260200280828437600083820152601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01690910182810360409081018252810186905290506020810160608201878780828437600083820152601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01690910184810383528581526020019050858580828437600083820152604051601f9091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169092018290039a509098505050505050505050a15b505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b609a6020526000908152604090205460ff1681565b6000806000858152609a602052604090205460ff166002811115610aa557fe5b14610b1157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f214d6573736167655374617475732e4e6f6e6500000000000000000000000000604482015290519081900360640190fd5b6000610b47858560208060200260405190810160405280929190826020800280828437600092019190915250879150611cd09050565b9050610b52816115df565b15610b985750506000838152609a6020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001908117909155610b9e565b60009150505b9392505050565b60975481565b609654600090610bc09063ffffffff16611d7b565b905090565b610bd783805190602001208383610a85565b610c4257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600660248201527f2170726f76650000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b610c4b83610ea3565b50505050565b60665481565b610c5f611c30565b73ffffffffffffffffffffffffffffffffffffffff16610c7d610e87565b73ffffffffffffffffffffffffffffffffffffffff1614610cff57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b60335460405160009173ffffffffffffffffffffffffffffffffffffffff16907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b60996020526000908152604090205481565b610d88611c30565b73ffffffffffffffffffffffffffffffffffffffff16610da6610e87565b73ffffffffffffffffffffffffffffffffffffffff1614610e2857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b60978190556040805182815290517fa8de34d9c26dbb20579bc8c8957813e3168af7c5092d7668390e34471dc4ffb49181900360200190a150565b7f000000000000000000000000000000000000000000000000000000000000000081565b60335473ffffffffffffffffffffffffffffffffffffffff1690565b600080610eb08382611df0565b905063ffffffff7f000000000000000000000000000000000000000000000000000000000000000016610f047fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008316611e16565b63ffffffff1614610f7657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f2164657374696e6174696f6e0000000000000000000000000000000000000000604482015290519081900360640190fd5b6000610fa37fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008316611e47565b905060016000828152609a602052604090205460ff166002811115610fc457fe5b1461103057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f2170726f76656e00000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b60985460ff166001146110a457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f217265656e7472616e7400000000000000000000000000000000000000000000604482015290519081900360640190fd5b609880547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff009081169091556000828152609a60205260409020805490911660021790557f00000000000000000000000000000000000000000000000000000000000000007f0000000000000000000000000000000000000000000000000000000000000000015a101561119a57604080517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048083019190915260248201527f2167617300000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b60006111c77fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008416611e86565b6040805161010080825261012082019092529192506000917f00000000000000000000000000000000000000000000000000000000000000009083908360208201818036833701905050905060006112407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008916611e99565b61126b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008a16611ec9565b6112967fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008b16611efa565b6112eb6112c47fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008d16611f2b565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000016611f9c565b604051602401808563ffffffff1681526020018463ffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015611349578181015183820152602001611331565b50505050905090810190601f1680156113765780820380516001836020036101000a031916815260200191505b50604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fab2dc3f50000000000000000000000000000000000000000000000000000000017815281519198506000975087965090945092508491508b905088f198503d945083851115611417578394505b848252846000602084013e816040518082805190602001908083835b6020831061147057805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09092019160209182019101611433565b5181516020939093036101000a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0180199091169216919091179052604051920182900382209350508b1515915089907fd42de95a9b26f1be134c8ecce389dc4fcfa18753d01661b7b361233569e8fe4890600090a45050609880547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905550949695505050505050565b60965463ffffffff1681565b611533611c30565b73ffffffffffffffffffffffffffffffffffffffff16611551610e87565b73ffffffffffffffffffffffffffffffffffffffff16146115d357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6115dc81611fe0565b50565b600081815260996020526040812054806115fd576000915050611603565b42101590505b919050565b600260655474010000000000000000000000000000000000000000900460ff16600281111561163357fe5b14156116a057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f6661696c65642073746174650000000000000000000000000000000000000000604482015290519081900360640190fd5b606654831461171057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f6e6f742063757272656e74207570646174650000000000000000000000000000604482015290519081900360640190fd5b61171b838383611c34565b61178657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f2175706461746572207369670000000000000000000000000000000000000000604482015290519081900360640190fd5b61178e611cce565b6097546000838152609960209081526040808320429094019093556066859055609654835182815285518184015285518795899563ffffffff909416947f608828ad904a0c9250c09004ba7226efb08f35a5c815bb3f76b5a8a271cd08b29489949384938401928601918190849084905b838110156118175781810151838201526020016117ff565b50505050905090810190601f1680156118445780820380516001836020036101000a031916815260200191505b509250505060405180910390a4505050565b60655474010000000000000000000000000000000000000000900460ff1681565b7f000000000000000000000000000000000000000000000000000000000000000081565b60655473ffffffffffffffffffffffffffffffffffffffff1681565b600054610100900460ff16806118d057506118d0612068565b806118de575060005460ff16155b611933576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e8152602001806132b2602e913960400191505060405180910390fd5b600054610100900460ff1615801561199957600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790555b6119a284612079565b6098805460017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff009091168117909155609680547fffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000001663ffffffff88161790556066849055600084815260996020908152604091829020929092556097849055805184815290517fa8de34d9c26dbb20579bc8c8957813e3168af7c5092d7668390e34471dc4ffb4929181900390910190a18015611a8257600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff1690555b5050505050565b611a91611c30565b73ffffffffffffffffffffffffffffffffffffffff16611aaf610e87565b73ffffffffffffffffffffffffffffffffffffffff1614611b3157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8116611b9d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806132496026913960400191505060405180910390fd5b60335460405173ffffffffffffffffffffffffffffffffffffffff8084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600081565b3390565b600080611c3f610bab565b8585604051602001808481526020018381526020018281526020019350505050604051602081830303815290604052805190602001209050611c80816121de565b60655490915073ffffffffffffffffffffffffffffffffffffffff16611ca6828561222f565b73ffffffffffffffffffffffffffffffffffffffff161495945050505050565b611cce6122c9565b565b8260005b6020811015611d7357600183821c166000858360208110611cf157fe5b602002015190508160011415611d375780846040516020018083815260200182815260200192505050604051602081830303815290604052805190602001209350611d69565b838160405160200180838152602001828152602001925050506040516020818303038152906040528051906020012093505b5050600101611cd4565b509392505050565b6040805160e09290921b7fffffffff00000000000000000000000000000000000000000000000000000000166020808401919091527f4e4f4d41440000000000000000000000000000000000000000000000000000006024840152815180840360090181526029909301909152815191012090565b815160009060208401611e0b64ffffffffff8516828461230a565b925050505b92915050565b6000611e107fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000831660286004612369565b600080611e538361238a565b6bffffffffffffffffffffffff1690506000611e6e8461239e565b6bffffffffffffffffffffffff169091209392505050565b6000611e10611e94836123b2565b6123e3565b6000611e107fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008316826004612369565b6000611e107fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000831660246004612369565b6000611e107fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008316600460206123e6565b6000611e10604c80611f5e7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000861661239e565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000861692916bffffffffffffffffffffffff91909116036000612591565b6060600080611faa8461239e565b6bffffffffffffffffffffffff1690506040519150819250611fcf8483602001612623565b508181016020016040529052919050565b6065805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040805191909216808252602082019390935281517f0f20622a7af9e952a6fec654a196f29e04477b5d335772c26902bec35cc9f22a929181900390910190a15050565b60006120733061274f565b15905090565b600054610100900460ff16806120925750612092612068565b806120a0575060005460ff16155b6120f5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e8152602001806132b2602e913960400191505060405180910390fd5b600054610100900460ff1615801561215b57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790555b612163612755565b61216c82611fe0565b606580547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff167401000000000000000000000000000000000000000017905580156121da57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff1690555b5050565b604080517f19457468657265756d205369676e6564204d6573736167653a0a333200000000602080830191909152603c8083019490945282518083039094018452605c909101909152815191012090565b600081516041146122a157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015290519081900360640190fd5b60208201516040830151606084015160001a6122bf86828585612878565b9695505050505050565b606580547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff1674020000000000000000000000000000000000000000179055565b6000806123178484612a66565b9050604051811115612327575060005b80612355577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000915050610b9e565b612360858585612ad8565b95945050505050565b60008160200360080260ff166123808585856123e6565b901c949350505050565b60781c6bffffffffffffffffffffffff1690565b60181c6bffffffffffffffffffffffff1690565b6000611e107fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008316602c60206123e6565b90565b600060ff82166123f857506000610b9e565b6124018461239e565b6bffffffffffffffffffffffff1661241c8460ff8516612a66565b11156124fb5761245d61242e8561238a565b6bffffffffffffffffffffffff166124458661239e565b6bffffffffffffffffffffffff16858560ff16612aeb565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156124c05781810151838201526020016124a8565b50505050905090810190601f1680156124ed5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b60208260ff161115612558576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603a815260200180613302603a913960400191505060405180910390fd5b6008820260006125678661238a565b6bffffffffffffffffffffffff169050600061258283612c46565b91909501511695945050505050565b60008061259d8661238a565b6bffffffffffffffffffffffff1690506125b686612c8f565b6125ca856125c48489612a66565b90612a66565b11156125f9577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000091505061261b565b6126038186612a66565b90506126178364ffffffffff16828661230a565b9150505b949350505050565b600061262e83612cb9565b612683576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602881526020018061333c6028913960400191505060405180910390fd5b61268c83612ccb565b6126e1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602b815260200180613364602b913960400191505060405180910390fd5b60006126ec8461239e565b6bffffffffffffffffffffffff16905060006127078561238a565b6bffffffffffffffffffffffff169050600060405190508481111561272c5760206060fd5b8285848460045afa506122bf61274187612d08565b64ffffffffff168685612ad8565b3b151590565b600054610100900460ff168061276e575061276e612068565b8061277c575060005460ff16155b6127d1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e8152602001806132b2602e913960400191505060405180910390fd5b600054610100900460ff1615801561283757600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790555b61283f612d0e565b612847612e20565b80156115dc57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff16905550565b60007f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08211156128f3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602281526020018061326f6022913960400191505060405180910390fd5b8360ff16601b148061290857508360ff16601c145b61295d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806132e06022913960400191505060405180910390fd5b600060018686868660405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa1580156129b9573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff811661236057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015290519081900360640190fd5b81810182811015611e1057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4f766572666c6f7720647572696e67206164646974696f6e2e00000000000000604482015290519081900360640190fd5b606092831b9190911790911b1760181b90565b60606000612af886612fb0565b9150506000612b0686612fb0565b9150506000612b1486612fb0565b9150506000612b2286612fb0565b91505083838383604051602001808061338f603591397fffffffffffff000000000000000000000000000000000000000000000000000060d087811b821660358401527f2077697468206c656e6774682030780000000000000000000000000000000000603b84015286901b16604a820152605001602161329182397fffffffffffff000000000000000000000000000000000000000000000000000060d094851b811660218301527f2077697468206c656e677468203078000000000000000000000000000000000060278301529290931b9091166036830152507f2e00000000000000000000000000000000000000000000000000000000000000603c82015260408051601d818403018152603d90920190529b9a5050505050505050505050565b7f80000000000000000000000000000000000000000000000000000000000000007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9091011d90565b6000612c9a8261239e565b612ca38361238a565b016bffffffffffffffffffffffff169050919050565b6000612cc482613084565b1592915050565b6000612cd682612d08565b64ffffffffff1664ffffffffff1415612cf157506000611603565b6000612cfc83612c8f565b60405110199392505050565b60d81c90565b600054610100900460ff1680612d275750612d27612068565b80612d35575060005460ff16155b612d8a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e8152602001806132b2602e913960400191505060405180910390fd5b600054610100900460ff1615801561284757600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff9091166101001716600117905580156115dc57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff16905550565b600054610100900460ff1680612e395750612e39612068565b80612e47575060005460ff16155b612e9c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e8152602001806132b2602e913960400191505060405180910390fd5b600054610100900460ff16158015612f0257600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790555b6000612f0c611c30565b603380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35080156115dc57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff16905550565b600080601f5b600f8160ff1611156130185760ff600882021684901c612fd5816130ac565b61ffff16841793508160ff16601014612ff057601084901b93505b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01612fb6565b50600f5b60ff8160ff16101561307e5760ff600882021684901c61303b816130ac565b61ffff16831792508160ff1660001461305657601083901b92505b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0161301c565b50915091565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000009081161490565b60006130be60048360ff16901c6130dc565b60ff161760081b62ffff00166130d3826130dc565b60ff1617919050565b600060f08083179060ff821614156130f8576030915050611603565b8060ff1660f1141561310e576031915050611603565b8060ff1660f21415613124576032915050611603565b8060ff1660f3141561313a576033915050611603565b8060ff1660f41415613150576034915050611603565b8060ff1660f51415613166576035915050611603565b8060ff1660f6141561317c576036915050611603565b8060ff1660f71415613192576037915050611603565b8060ff1660f814156131a8576038915050611603565b8060ff1660f914156131be576039915050611603565b8060ff1660fa14156131d4576061915050611603565b8060ff1660fb14156131ea576062915050611603565b8060ff1660fc1415613200576063915050611603565b8060ff1660fd1415613216576064915050611603565b8060ff1660fe141561322c576065915050611603565b8060ff1660ff1415613242576066915050611603565b5091905056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345434453413a20696e76616c6964207369676e6174757265202773272076616c75652e20417474656d7074656420746f20696e646578206174206f6666736574203078496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a656445434453413a20696e76616c6964207369676e6174757265202776272076616c756554797065644d656d566965772f696e646578202d20417474656d7074656420746f20696e646578206d6f7265207468616e20333220627974657354797065644d656d566965772f636f7079546f202d204e756c6c20706f696e74657220646572656654797065644d656d566965772f636f7079546f202d20496e76616c696420706f696e74657220646572656654797065644d656d566965772f696e646578202d204f76657272616e2074686520766965772e20536c696365206973206174203078a2646970667358221220a6f9e1792606c90c5fa8c676399b3e12306a9c15070b3f920bfac034bb4af77564736f6c63430007060033";

export class Replica__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _localDomain: BigNumberish,
    _processGas: BigNumberish,
    _reserveGas: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Replica> {
    return super.deploy(
      _localDomain,
      _processGas,
      _reserveGas,
      overrides || {}
    ) as Promise<Replica>;
  }
  getDeployTransaction(
    _localDomain: BigNumberish,
    _processGas: BigNumberish,
    _reserveGas: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _localDomain,
      _processGas,
      _reserveGas,
      overrides || {}
    );
  }
  attach(address: string): Replica {
    return super.attach(address) as Replica;
  }
  connect(signer: Signer): Replica__factory {
    return super.connect(signer) as Replica__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReplicaInterface {
    return new utils.Interface(_abi) as ReplicaInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Replica {
    return new Contract(address, _abi, signerOrProvider) as Replica;
  }
}