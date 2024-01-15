/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export interface KingInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "AMOUNT_ON_SALE"
      | "OG"
      | "OPEN"
      | "TOTAL_SUPPLY"
      | "WHITELIST"
      | "approve"
      | "balanceOf"
      | "baseTokenURI"
      | "getApproved"
      | "isApprovedForAll"
      | "isOGWhitelisted"
      | "isWhitelisted"
      | "name"
      | "owner"
      | "ownerOf"
      | "price"
      | "purchase"
      | "purchaseBatch"
      | "purchaseBatchOG"
      | "purchaseBatchWhitelist"
      | "purchaseOG"
      | "purchaseWhitelist"
      | "renounceOwnership"
      | "reserveMint"
      | "reserveMintBatch"
      | "safeTransferFrom(address,address,uint256)"
      | "safeTransferFrom(address,address,uint256,bytes)"
      | "setApprovalForAll"
      | "setBaseURI"
      | "supportsInterface"
      | "symbol"
      | "tokenURI"
      | "transferFrom"
      | "transferOwnership"
      | "walletOfOwner"
      | "withdraw"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Approval"
      | "ApprovalForAll"
      | "KingPurchased"
      | "OwnershipTransferred"
      | "Transfer"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "AMOUNT_ON_SALE",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "OG", values?: undefined): string;
  encodeFunctionData(functionFragment: "OPEN", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "TOTAL_SUPPLY",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "WHITELIST", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "baseTokenURI",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getApproved",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isOGWhitelisted",
    values: [AddressLike, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "isWhitelisted",
    values: [AddressLike, BytesLike[]]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "price", values?: undefined): string;
  encodeFunctionData(functionFragment: "purchase", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "purchaseBatch",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "purchaseBatchOG",
    values: [BigNumberish, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "purchaseBatchWhitelist",
    values: [BigNumberish, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "purchaseOG",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "purchaseWhitelist",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "reserveMint",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "reserveMintBatch",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom(address,address,uint256)",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom(address,address,uint256,bytes)",
    values: [AddressLike, AddressLike, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(functionFragment: "setBaseURI", values: [string]): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenURI",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "walletOfOwner",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "AMOUNT_ON_SALE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "OG", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "OPEN", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "TOTAL_SUPPLY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "WHITELIST", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "baseTokenURI",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isOGWhitelisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isWhitelisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "price", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "purchase", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "purchaseBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "purchaseBatchOG",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "purchaseBatchWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "purchaseOG", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "purchaseWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reserveMint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reserveMintBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom(address,address,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom(address,address,uint256,bytes)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setBaseURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "walletOfOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export namespace ApprovalEvent {
  export type InputTuple = [
    owner: AddressLike,
    approved: AddressLike,
    tokenId: BigNumberish
  ];
  export type OutputTuple = [owner: string, approved: string, tokenId: bigint];
  export interface OutputObject {
    owner: string;
    approved: string;
    tokenId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ApprovalForAllEvent {
  export type InputTuple = [
    owner: AddressLike,
    operator: AddressLike,
    approved: boolean
  ];
  export type OutputTuple = [
    owner: string,
    operator: string,
    approved: boolean
  ];
  export interface OutputObject {
    owner: string;
    operator: string;
    approved: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace KingPurchasedEvent {
  export type InputTuple = [buyer: AddressLike, tokenId: BigNumberish];
  export type OutputTuple = [buyer: string, tokenId: bigint];
  export interface OutputObject {
    buyer: string;
    tokenId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    from: AddressLike,
    to: AddressLike,
    tokenId: BigNumberish
  ];
  export type OutputTuple = [from: string, to: string, tokenId: bigint];
  export interface OutputObject {
    from: string;
    to: string;
    tokenId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface King extends BaseContract {
  connect(runner?: ContractRunner | null): King;
  waitForDeployment(): Promise<this>;

  interface: KingInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  AMOUNT_ON_SALE: TypedContractMethod<[], [bigint], "view">;

  OG: TypedContractMethod<[], [bigint], "view">;

  OPEN: TypedContractMethod<[], [bigint], "view">;

  TOTAL_SUPPLY: TypedContractMethod<[], [bigint], "view">;

  WHITELIST: TypedContractMethod<[], [bigint], "view">;

  approve: TypedContractMethod<
    [to: AddressLike, tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;

  balanceOf: TypedContractMethod<[owner: AddressLike], [bigint], "view">;

  baseTokenURI: TypedContractMethod<[], [string], "view">;

  getApproved: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;

  isApprovedForAll: TypedContractMethod<
    [owner: AddressLike, operator: AddressLike],
    [boolean],
    "view"
  >;

  isOGWhitelisted: TypedContractMethod<
    [_address: AddressLike, _proof: BytesLike[]],
    [boolean],
    "view"
  >;

  isWhitelisted: TypedContractMethod<
    [_address: AddressLike, _proof: BytesLike[]],
    [boolean],
    "view"
  >;

  name: TypedContractMethod<[], [string], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  ownerOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;

  price: TypedContractMethod<[], [bigint], "view">;

  purchase: TypedContractMethod<[], [void], "payable">;

  purchaseBatch: TypedContractMethod<[_batch: BigNumberish], [void], "payable">;

  purchaseBatchOG: TypedContractMethod<
    [_batch: BigNumberish, _proof: BytesLike[]],
    [void],
    "payable"
  >;

  purchaseBatchWhitelist: TypedContractMethod<
    [_batch: BigNumberish, _proof: BytesLike[]],
    [void],
    "payable"
  >;

  purchaseOG: TypedContractMethod<[_proof: BytesLike[]], [void], "payable">;

  purchaseWhitelist: TypedContractMethod<
    [_proof: BytesLike[]],
    [void],
    "payable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  reserveMint: TypedContractMethod<[_to: AddressLike], [void], "nonpayable">;

  reserveMintBatch: TypedContractMethod<
    [_to: AddressLike, _batch: BigNumberish],
    [void],
    "nonpayable"
  >;

  "safeTransferFrom(address,address,uint256)": TypedContractMethod<
    [from: AddressLike, to: AddressLike, tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;

  "safeTransferFrom(address,address,uint256,bytes)": TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      tokenId: BigNumberish,
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  setApprovalForAll: TypedContractMethod<
    [operator: AddressLike, approved: boolean],
    [void],
    "nonpayable"
  >;

  setBaseURI: TypedContractMethod<[baseURI: string], [void], "nonpayable">;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  symbol: TypedContractMethod<[], [string], "view">;

  tokenURI: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;

  transferFrom: TypedContractMethod<
    [from: AddressLike, to: AddressLike, tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  walletOfOwner: TypedContractMethod<[_owner: AddressLike], [bigint[]], "view">;

  withdraw: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "AMOUNT_ON_SALE"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(nameOrSignature: "OG"): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "OPEN"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "TOTAL_SUPPLY"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "WHITELIST"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "approve"
  ): TypedContractMethod<
    [to: AddressLike, tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "baseTokenURI"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getApproved"
  ): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "isApprovedForAll"
  ): TypedContractMethod<
    [owner: AddressLike, operator: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "isOGWhitelisted"
  ): TypedContractMethod<
    [_address: AddressLike, _proof: BytesLike[]],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "isWhitelisted"
  ): TypedContractMethod<
    [_address: AddressLike, _proof: BytesLike[]],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "name"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "ownerOf"
  ): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "price"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "purchase"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "purchaseBatch"
  ): TypedContractMethod<[_batch: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "purchaseBatchOG"
  ): TypedContractMethod<
    [_batch: BigNumberish, _proof: BytesLike[]],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "purchaseBatchWhitelist"
  ): TypedContractMethod<
    [_batch: BigNumberish, _proof: BytesLike[]],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "purchaseOG"
  ): TypedContractMethod<[_proof: BytesLike[]], [void], "payable">;
  getFunction(
    nameOrSignature: "purchaseWhitelist"
  ): TypedContractMethod<[_proof: BytesLike[]], [void], "payable">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "reserveMint"
  ): TypedContractMethod<[_to: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "reserveMintBatch"
  ): TypedContractMethod<
    [_to: AddressLike, _batch: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "safeTransferFrom(address,address,uint256)"
  ): TypedContractMethod<
    [from: AddressLike, to: AddressLike, tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "safeTransferFrom(address,address,uint256,bytes)"
  ): TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      tokenId: BigNumberish,
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setApprovalForAll"
  ): TypedContractMethod<
    [operator: AddressLike, approved: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setBaseURI"
  ): TypedContractMethod<[baseURI: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "symbol"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "tokenURI"
  ): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "transferFrom"
  ): TypedContractMethod<
    [from: AddressLike, to: AddressLike, tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "walletOfOwner"
  ): TypedContractMethod<[_owner: AddressLike], [bigint[]], "view">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<[], [void], "nonpayable">;

  getEvent(
    key: "Approval"
  ): TypedContractEvent<
    ApprovalEvent.InputTuple,
    ApprovalEvent.OutputTuple,
    ApprovalEvent.OutputObject
  >;
  getEvent(
    key: "ApprovalForAll"
  ): TypedContractEvent<
    ApprovalForAllEvent.InputTuple,
    ApprovalForAllEvent.OutputTuple,
    ApprovalForAllEvent.OutputObject
  >;
  getEvent(
    key: "KingPurchased"
  ): TypedContractEvent<
    KingPurchasedEvent.InputTuple,
    KingPurchasedEvent.OutputTuple,
    KingPurchasedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;

  filters: {
    "Approval(address,address,uint256)": TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;
    Approval: TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;

    "ApprovalForAll(address,address,bool)": TypedContractEvent<
      ApprovalForAllEvent.InputTuple,
      ApprovalForAllEvent.OutputTuple,
      ApprovalForAllEvent.OutputObject
    >;
    ApprovalForAll: TypedContractEvent<
      ApprovalForAllEvent.InputTuple,
      ApprovalForAllEvent.OutputTuple,
      ApprovalForAllEvent.OutputObject
    >;

    "KingPurchased(address,uint256)": TypedContractEvent<
      KingPurchasedEvent.InputTuple,
      KingPurchasedEvent.OutputTuple,
      KingPurchasedEvent.OutputObject
    >;
    KingPurchased: TypedContractEvent<
      KingPurchasedEvent.InputTuple,
      KingPurchasedEvent.OutputTuple,
      KingPurchasedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "Transfer(address,address,uint256)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
  };
}
