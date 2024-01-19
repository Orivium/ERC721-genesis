/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BytesLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  King2d,
  King2dInterface,
} from "../../../../contracts/token/ERC721/King2d";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "baseURI",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "_whitelistMerkleRoot",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_ogWhitelistMerkleRoot",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxAmountMinted",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxWLAmountMinted",
    type: "error",
  },
  {
    inputs: [],
    name: "MintPhaseNotStarted",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyOGWhitelist",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyWhitelist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "SoldOut",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "minter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "King2dMinted",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "AMOUNT_ON_FREE_MINT",
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
    name: "MAX_WALLET_AMOUNT",
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
    name: "OG",
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
    name: "OPEN",
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
    name: "TOTAL_SUPPLY",
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
    name: "WHITELIST",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "baseTokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_batch",
        type: "uint256",
      },
    ],
    name: "freeBatchMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "freeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "_proof",
        type: "bytes32[]",
      },
    ],
    name: "freeMintOG",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "_proof",
        type: "bytes32[]",
      },
    ],
    name: "freeMintWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "bytes32[]",
        name: "_proof",
        type: "bytes32[]",
      },
    ],
    name: "isOGWhitelisted",
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
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "bytes32[]",
        name: "_proof",
        type: "bytes32[]",
      },
    ],
    name: "isWhitelisted",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "mintedAmount",
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
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_batch",
        type: "uint256",
      },
    ],
    name: "reserveBatchMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
    ],
    name: "reserveMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "baseURI",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "_wallet",
        type: "address",
      },
    ],
    name: "walletMintable",
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
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "walletOfOwner",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "whitelistMint",
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
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002b3a38038062002b3a8339810160408190526200003491620001b1565b8181336040518060400160405280600681526020016512da5b99cc9960d21b8152506040518060400160405280600681526020016512d25391cc9160d21b815250816000908162000086919062000329565b50600162000095828262000329565b50506001600655506001600160a01b038116620000cd57604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b620000d881620000fc565b50600891909155600955620000ed836200014e565b5050610fa0600b5550620003f5565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b620001586200016a565b600c62000166828262000329565b5050565b6007546001600160a01b03163314620001995760405163118cdaa760e01b8152336004820152602401620000c4565b565b634e487b7160e01b600052604160045260246000fd5b600080600060608486031215620001c757600080fd5b83516001600160401b0380821115620001df57600080fd5b818601915086601f830112620001f457600080fd5b8151818111156200020957620002096200019b565b604051601f8201601f19908116603f011681019083821181831017156200023457620002346200019b565b816040528281526020935089848487010111156200025157600080fd5b600091505b8282101562000275578482018401518183018501529083019062000256565b600092810184019290925250908601516040909601519097959650949350505050565b600181811c90821680620002ad57607f821691505b602082108103620002ce57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111562000324576000816000526020600020601f850160051c81016020861015620002ff5750805b601f850160051c820191505b8181101562000320578281556001016200030b565b5050505b505050565b81516001600160401b038111156200034557620003456200019b565b6200035d8162000356845462000298565b84620002d4565b602080601f8311600181146200039557600084156200037c5750858301515b600019600386901b1c1916600185901b17855562000320565b600085815260208120601f198616915b82811015620003c657888601518255948401946001909101908401620003a5565b5085821015620003e55787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61273580620004056000396000f3fe608060405234801561001057600080fd5b506004361061025c5760003560e01c80638da5cb5b11610145578063d1b9c430116100bd578063e9234d031161008c578063f2fde38b11610071578063f2fde38b14610515578063f646203e14610528578063fbbf8cc31461053b57600080fd5b8063e9234d03146104b9578063e985e9c5146104cc57600080fd5b8063d1b9c4301461048a578063d547cfb714610495578063dc3034ae1461049d578063ddf01742146104b057600080fd5b8063acee9c4d11610114578063bf610d7e116100f9578063bf610d7e14610441578063c69a7d5814610464578063c87b56dd1461047757600080fd5b8063acee9c4d1461041b578063b88d4fde1461042e57600080fd5b80638da5cb5b146103d9578063902d55a5146103f757806395d89b4114610400578063a22cb4651461040857600080fd5b806344b8b94d116101d85780635b70ea9f116101a757806370a082311161018c57806370a08231146103b6578063715018a6146103c95780637e0ec1d1146103d157600080fd5b80635b70ea9f1461039b5780636352211e146103a357600080fd5b806344b8b94d1461034f5780634b048b401461036257806355f804b3146103755780635a23dd991461038857600080fd5b806317e9884d1161022f57806323b872dd1161021457806323b872dd1461030957806342842e0e1461031c578063438b63001461032f57600080fd5b806317e9884d146102eb5780631bb7cc991461030157600080fd5b806301ffc9a71461026157806306fdde0314610289578063081812fc1461029e578063095ea7b3146102d6575b600080fd5b61027461026f366004611f74565b61055b565b60405190151581526020015b60405180910390f35b610291610640565b6040516102809190611fff565b6102b16102ac366004612012565b6106d2565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610280565b6102e96102e4366004612054565b610708565b005b6102f3610717565b604051908152602001610280565b6102f3610735565b6102e961031736600461207e565b610745565b6102e961032a36600461207e565b61083b565b61034261033d3660046120ba565b61085b565b60405161028091906120d5565b6102e961035d366004612165565b61095a565b6102f36103703660046120ba565b610a05565b6102e961038336600461226a565b610a36565b6102746103963660046122b3565b610a4a565b6102e9610ae3565b6102b16103b1366004612012565b610b40565b6102f36103c43660046120ba565b610b4b565b6102e9610bc6565b6102f3600581565b60075473ffffffffffffffffffffffffffffffffffffffff166102b1565b6102f361115c81565b610291610bd8565b6102e9610416366004612306565b610be7565b6102e96104293660046120ba565b610bf2565b6102e961043c366004612342565b610c43565b61027461044f3660046120ba565b600e6020526000908152604090205460ff1681565b6102e9610472366004612012565b610c5a565b610291610485366004612012565b610cb6565b6102f36365b5288081565b610291610d1e565b6102e96104ab366004612165565b610dac565b6102f3610fa081565b6102746104c73660046122b3565b610e12565b6102746104da3660046123be565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260056020908152604080832093909416825291909152205460ff1690565b6102e96105233660046120ba565b610ea2565b6102e9610536366004612054565b610f03565b6102f36105493660046120ba565b600d6020526000908152604090205481565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd0000000000000000000000000000000000000000000000000000000014806105ee57507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b8061063a57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60606000805461064f906123f1565b80601f016020809104026020016040519081016040528092919081815260200182805461067b906123f1565b80156106c85780601f1061069d576101008083540402835291602001916106c8565b820191906000526020600020905b8154815290600101906020018083116106ab57829003601f168201915b5050505050905090565b60006106dd82610f7a565b5060008281526004602052604090205473ffffffffffffffffffffffffffffffffffffffff1661063a565b610713828233610fd9565b5050565b611c20610728816365b52880612473565b6107329190612473565b81565b610732611c206365b52880612473565b73ffffffffffffffffffffffffffffffffffffffff821661079a576040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600060048201526024015b60405180910390fd5b60006107a7838333610fe6565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610835576040517f64283d7b00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff80861660048301526024820184905282166044820152606401610791565b50505050565b61085683838360405180602001604052806000815250610c43565b505050565b6060600061086883610b4b565b90506000808267ffffffffffffffff811115610886576108866121a7565b6040519080825280602002602001820160405280156108af578160200160208202803683370190505b509050826000036108d25750506040805160008152602081019091529392505050565b60015b61115c81116109515760008181526002602052604090205473ffffffffffffffffffffffffffffffffffffffff87811691160361093f578082848151811061091f5761091f612486565b602090810291909101015282610934816124b5565b935050838314610951575b61094a6001826124ed565b90506108d5565b50949350505050565b610962611163565b818161096f338383610a4a565b6109a5576040517fd9d4528c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6109b5611c206365b52880612473565b804210156109ef576040517f20d4c56500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6109f8336111a6565b5050506107136001600655565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600d602052604081205461063a906005612473565b610a3e61125d565b600c6107138282612550565b6040517fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606085901b1660208201526000908190603401604051602081830303815290604052805190602001209050610ada8484808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152505060085491508490506112b0565b95945050505050565b610aeb611163565b6365b5288080421015610b2a576040517f20d4c56500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610b33336112c6565b50610b3e6001600655565b565b600061063a82610f7a565b600073ffffffffffffffffffffffffffffffffffffffff8216610b9d576040517f89c62b6400000000000000000000000000000000000000000000000000000000815260006004820152602401610791565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205490565b610bce61125d565b610b3e60006113a7565b60606001805461064f906123f1565b61071333838361141e565b610bfa61125d565b61115c600b5410610c37576040517f52df9fe500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610c408161151b565b50565b610c4e848484610745565b6108358484848461158b565b610c62611163565b6365b5288080421015610ca1576040517f20d4c56500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610cab3383611782565b50610c406001600655565b6060610cc182610f7a565b506000610ccc611898565b90506000815111610cec5760405180602001604052806000815250610d17565b80610cf6846118a7565b604051602001610d0792919061266a565b6040516020818303038152906040525b9392505050565b600c8054610d2b906123f1565b80601f0160208091040260200160405190810160405280929190818152602001828054610d57906123f1565b8015610da45780601f10610d7957610100808354040283529160200191610da4565b820191906000526020600020905b815481529060010190602001808311610d8757829003601f168201915b505050505081565b610db4611163565b8181610dc1338383610e12565b610df7576040517f544be26500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611c20610e08816365b52880612473565b6109b59190612473565b6040517fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606085901b1660208201526000908190603401604051602081830303815290604052805190602001209050610ada8484808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152505060095491508490506112b0565b610eaa61125d565b73ffffffffffffffffffffffffffffffffffffffff8116610efa576040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260006004820152602401610791565b610c40816113a7565b610f0b61125d565b61115c81600b54610f1c91906124ed565b1115610f54576040517f52df9fe500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b8181101561085657610f688361151b565b610f736001826124ed565b9050610f57565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff168061063a576040517f7e27328900000000000000000000000000000000000000000000000000000000815260048101849052602401610791565b6108568383836001611965565b60008281526002602052604081205473ffffffffffffffffffffffffffffffffffffffff9081169083161561102057611020818486611b30565b73ffffffffffffffffffffffffffffffffffffffff8116156110965761104a600085600080611965565b73ffffffffffffffffffffffffffffffffffffffff8116600090815260036020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190555b73ffffffffffffffffffffffffffffffffffffffff8516156110df5773ffffffffffffffffffffffffffffffffffffffff85166000908152600360205260409020805460010190555b60008481526002602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff89811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b60026006540361119f576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002600655565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600e602052604090205460ff1615611206576040517fbb0a900900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff81166000908152600e6020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055610c40816112c6565b60075473ffffffffffffffffffffffffffffffffffffffff163314610b3e576040517f118cdaa7000000000000000000000000000000000000000000000000000000008152336004820152602401610791565b6000826112bd8584611be0565b14949350505050565b610fa0600a5410611303576040517f52df9fe500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff81166000908152600d6020526040902054600511611362576040517fec44acdd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff81166000908152600d602052604081208054600192906113989084906124ed565b90915550610c40905081611c23565b6007805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b73ffffffffffffffffffffffffffffffffffffffff8216611483576040517f5b08ba1800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff83166004820152602401610791565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526005602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600b600082825461152e91906124ed565b9091555050600b5460405173ffffffffffffffffffffffffffffffffffffffff831681527f8025032f7b79b0664070c0c4eb9e21f600ca177545aab9eac6d293dd6fde1ae29060200160405180910390a2610c4081600b54611c8f565b73ffffffffffffffffffffffffffffffffffffffff83163b15610835576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff84169063150b7a0290611600903390889087908790600401612699565b6020604051808303816000875af1925050508015611659575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611656918101906126e2565b60015b6116e8573d808015611687576040519150601f19603f3d011682016040523d82523d6000602084013e61168c565b606091505b5080516000036116e0576040517f64a0ae9200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85166004820152602401610791565b805181602001fd5b7fffffffff0000000000000000000000000000000000000000000000000000000081167f150b7a02000000000000000000000000000000000000000000000000000000001461177b576040517f64a0ae9200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85166004820152602401610791565b5050505050565b610fa081600a5461179391906124ed565b11156117cb576040517f52df9fe500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff82166000908152600d60205260409020546005906117ff9083906124ed565b1115611837576040517fec44acdd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff82166000908152600d60205260408120805483929061186c9084906124ed565b90915550600090505b818110156108565761188683611c23565b6118916001826124ed565b9050611875565b6060600c805461064f906123f1565b606060006118b483611ca9565b600101905060008167ffffffffffffffff8111156118d4576118d46121a7565b6040519080825280601f01601f1916602001820160405280156118fe576020820181803683370190505b5090508181016020015b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff017f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a850494508461190857509392505050565b8080611986575073ffffffffffffffffffffffffffffffffffffffff821615155b15611adb57600061199684610f7a565b905073ffffffffffffffffffffffffffffffffffffffff8316158015906119e957508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b8015611a28575073ffffffffffffffffffffffffffffffffffffffff80821660009081526005602090815260408083209387168352929052205460ff16155b15611a77576040517fa9fbf51f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff84166004820152602401610791565b8115611ad957838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b5050600090815260046020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b611b3b838383611d8b565b6108565773ffffffffffffffffffffffffffffffffffffffff8316611b8f576040517f7e27328900000000000000000000000000000000000000000000000000000000815260048101829052602401610791565b6040517f177e802f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8316600482015260248101829052604401610791565b600081815b8451811015611c1b57611c1182868381518110611c0457611c04612486565b6020026020010151611e52565b9150600101611be5565b509392505050565b6001600a6000828254611c3691906124ed565b9091555050600a5460405173ffffffffffffffffffffffffffffffffffffffff831681527f8025032f7b79b0664070c0c4eb9e21f600ca177545aab9eac6d293dd6fde1ae29060200160405180910390a2610c4081600a545b610713828260405180602001604052806000815250611e7e565b6000807a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611cf2577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000830492506040015b6d04ee2d6d415b85acef81000000008310611d1e576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310611d3c57662386f26fc10000830492506010015b6305f5e1008310611d54576305f5e100830492506008015b6127108310611d6857612710830492506004015b60648310611d7a576064830492506002015b600a831061063a5760010192915050565b600073ffffffffffffffffffffffffffffffffffffffff831615801590611e4a57508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480611e19575073ffffffffffffffffffffffffffffffffffffffff80851660009081526005602090815260408083209387168352929052205460ff165b80611e4a575060008281526004602052604090205473ffffffffffffffffffffffffffffffffffffffff8481169116145b949350505050565b6000818310611e6e576000828152602084905260409020610d17565b5060009182526020526040902090565b611e888383611e95565b610856600084848461158b565b73ffffffffffffffffffffffffffffffffffffffff8216611ee5576040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260006004820152602401610791565b6000611ef383836000610fe6565b905073ffffffffffffffffffffffffffffffffffffffff811615610856576040517f73c6ac6e00000000000000000000000000000000000000000000000000000000815260006004820152602401610791565b7fffffffff0000000000000000000000000000000000000000000000000000000081168114610c4057600080fd5b600060208284031215611f8657600080fd5b8135610d1781611f46565b60005b83811015611fac578181015183820152602001611f94565b50506000910152565b60008151808452611fcd816020860160208601611f91565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b602081526000610d176020830184611fb5565b60006020828403121561202457600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461204f57600080fd5b919050565b6000806040838503121561206757600080fd5b6120708361202b565b946020939093013593505050565b60008060006060848603121561209357600080fd5b61209c8461202b565b92506120aa6020850161202b565b9150604084013590509250925092565b6000602082840312156120cc57600080fd5b610d178261202b565b6020808252825182820181905260009190848201906040850190845b8181101561210d578351835292840192918401916001016120f1565b50909695505050505050565b60008083601f84011261212b57600080fd5b50813567ffffffffffffffff81111561214357600080fd5b6020830191508360208260051b850101111561215e57600080fd5b9250929050565b6000806020838503121561217857600080fd5b823567ffffffffffffffff81111561218f57600080fd5b61219b85828601612119565b90969095509350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600067ffffffffffffffff808411156121f1576121f16121a7565b604051601f85017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715612237576122376121a7565b8160405280935085815286868601111561225057600080fd5b858560208301376000602087830101525050509392505050565b60006020828403121561227c57600080fd5b813567ffffffffffffffff81111561229357600080fd5b8201601f810184136122a457600080fd5b611e4a848235602084016121d6565b6000806000604084860312156122c857600080fd5b6122d18461202b565b9250602084013567ffffffffffffffff8111156122ed57600080fd5b6122f986828701612119565b9497909650939450505050565b6000806040838503121561231957600080fd5b6123228361202b565b91506020830135801515811461233757600080fd5b809150509250929050565b6000806000806080858703121561235857600080fd5b6123618561202b565b935061236f6020860161202b565b925060408501359150606085013567ffffffffffffffff81111561239257600080fd5b8501601f810187136123a357600080fd5b6123b2878235602084016121d6565b91505092959194509250565b600080604083850312156123d157600080fd5b6123da8361202b565b91506123e86020840161202b565b90509250929050565b600181811c9082168061240557607f821691505b60208210810361243e577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8181038181111561063a5761063a612444565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036124e6576124e6612444565b5060010190565b8082018082111561063a5761063a612444565b601f821115610856576000816000526020600020601f850160051c810160208610156125295750805b601f850160051c820191505b8181101561254857828155600101612535565b505050505050565b815167ffffffffffffffff81111561256a5761256a6121a7565b61257e8161257884546123f1565b84612500565b602080601f8311600181146125d1576000841561259b5750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555612548565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b8281101561261e578886015182559484019460019091019084016125ff565b508582101561265a57878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b6000835161267c818460208801611f91565b835190830190612690818360208801611f91565b01949350505050565b600073ffffffffffffffffffffffffffffffffffffffff8087168352808616602084015250836040830152608060608301526126d86080830184611fb5565b9695505050505050565b6000602082840312156126f457600080fd5b8151610d1781611f4656fea2646970667358221220809fadc218f2be8a2f6bb5bcd1a63009b40398549550172585629bbf123fdb7f64736f6c63430008160033";

type King2dConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: King2dConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class King2d__factory extends ContractFactory {
  constructor(...args: King2dConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    baseURI: string,
    _whitelistMerkleRoot: BytesLike,
    _ogWhitelistMerkleRoot: BytesLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      baseURI,
      _whitelistMerkleRoot,
      _ogWhitelistMerkleRoot,
      overrides || {}
    );
  }
  override deploy(
    baseURI: string,
    _whitelistMerkleRoot: BytesLike,
    _ogWhitelistMerkleRoot: BytesLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      baseURI,
      _whitelistMerkleRoot,
      _ogWhitelistMerkleRoot,
      overrides || {}
    ) as Promise<
      King2d & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): King2d__factory {
    return super.connect(runner) as King2d__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): King2dInterface {
    return new Interface(_abi) as King2dInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): King2d {
    return new Contract(address, _abi, runner) as unknown as King2d;
  }
}
