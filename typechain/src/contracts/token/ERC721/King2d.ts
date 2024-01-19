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

export interface King2dInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "AMOUNT_ON_FREE_MINT"
      | "MAX_WALLET_AMOUNT"
      | "OG"
      | "OPEN"
      | "ORIVIUM_MULTI_SIG_WALLET"
      | "TOTAL_SUPPLY"
      | "WHITELIST"
      | "approve"
      | "balanceOf"
      | "freeBatchMint"
      | "freeMint"
      | "freeMintOG"
      | "freeMintWhitelist"
      | "getApproved"
      | "isApprovedForAll"
      | "isOGWhitelisted"
      | "isWhitelisted"
      | "mintedAmount"
      | "name"
      | "ownerOf"
      | "safeTransferFrom(address,address,uint256)"
      | "safeTransferFrom(address,address,uint256,bytes)"
      | "setApprovalForAll"
      | "supportsInterface"
      | "symbol"
      | "tokenURI"
      | "transferFrom"
      | "walletMintable"
      | "walletOfOwner"
      | "whitelistMint"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Approval"
      | "ApprovalForAll"
      | "King2dMinted"
      | "Transfer"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "AMOUNT_ON_FREE_MINT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MAX_WALLET_AMOUNT",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "OG", values?: undefined): string;
  encodeFunctionData(functionFragment: "OPEN", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ORIVIUM_MULTI_SIG_WALLET",
    values?: undefined
  ): string;
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
    functionFragment: "freeBatchMint",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "freeMint", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "freeMintOG",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "freeMintWhitelist",
    values: [BytesLike[]]
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
  encodeFunctionData(
    functionFragment: "mintedAmount",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
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
    functionFragment: "walletMintable",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "walletOfOwner",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "whitelistMint",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "AMOUNT_ON_FREE_MINT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MAX_WALLET_AMOUNT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "OG", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "OPEN", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ORIVIUM_MULTI_SIG_WALLET",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "TOTAL_SUPPLY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "WHITELIST", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "freeBatchMint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "freeMint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "freeMintOG", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "freeMintWhitelist",
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
  decodeFunctionResult(
    functionFragment: "mintedAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
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
    functionFragment: "walletMintable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "walletOfOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "whitelistMint",
    data: BytesLike
  ): Result;
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

export namespace King2dMintedEvent {
  export type InputTuple = [minter: AddressLike, tokenId: BigNumberish];
  export type OutputTuple = [minter: string, tokenId: bigint];
  export interface OutputObject {
    minter: string;
    tokenId: bigint;
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

export interface King2d extends BaseContract {
  connect(runner?: ContractRunner | null): King2d;
  waitForDeployment(): Promise<this>;

  interface: King2dInterface;

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

  AMOUNT_ON_FREE_MINT: TypedContractMethod<[], [bigint], "view">;

  MAX_WALLET_AMOUNT: TypedContractMethod<[], [bigint], "view">;

  OG: TypedContractMethod<[], [bigint], "view">;

  OPEN: TypedContractMethod<[], [bigint], "view">;

  ORIVIUM_MULTI_SIG_WALLET: TypedContractMethod<[], [string], "view">;

  TOTAL_SUPPLY: TypedContractMethod<[], [bigint], "view">;

  WHITELIST: TypedContractMethod<[], [bigint], "view">;

  approve: TypedContractMethod<
    [to: AddressLike, tokenId: BigNumberish],
    [void],
    "nonpayable"
  >;

  balanceOf: TypedContractMethod<[owner: AddressLike], [bigint], "view">;

  freeBatchMint: TypedContractMethod<
    [_batch: BigNumberish],
    [void],
    "nonpayable"
  >;

  freeMint: TypedContractMethod<[], [void], "nonpayable">;

  freeMintOG: TypedContractMethod<[_proof: BytesLike[]], [void], "nonpayable">;

  freeMintWhitelist: TypedContractMethod<
    [_proof: BytesLike[]],
    [void],
    "nonpayable"
  >;

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

  mintedAmount: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  name: TypedContractMethod<[], [string], "view">;

  ownerOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;

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

  walletMintable: TypedContractMethod<[_wallet: AddressLike], [bigint], "view">;

  walletOfOwner: TypedContractMethod<[_owner: AddressLike], [bigint[]], "view">;

  whitelistMint: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "AMOUNT_ON_FREE_MINT"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "MAX_WALLET_AMOUNT"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(nameOrSignature: "OG"): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "OPEN"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "ORIVIUM_MULTI_SIG_WALLET"
  ): TypedContractMethod<[], [string], "view">;
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
    nameOrSignature: "freeBatchMint"
  ): TypedContractMethod<[_batch: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "freeMint"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "freeMintOG"
  ): TypedContractMethod<[_proof: BytesLike[]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "freeMintWhitelist"
  ): TypedContractMethod<[_proof: BytesLike[]], [void], "nonpayable">;
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
    nameOrSignature: "mintedAmount"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "name"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "ownerOf"
  ): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
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
    nameOrSignature: "walletMintable"
  ): TypedContractMethod<[_wallet: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "walletOfOwner"
  ): TypedContractMethod<[_owner: AddressLike], [bigint[]], "view">;
  getFunction(
    nameOrSignature: "whitelistMint"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

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
    key: "King2dMinted"
  ): TypedContractEvent<
    King2dMintedEvent.InputTuple,
    King2dMintedEvent.OutputTuple,
    King2dMintedEvent.OutputObject
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

    "King2dMinted(address,uint256)": TypedContractEvent<
      King2dMintedEvent.InputTuple,
      King2dMintedEvent.OutputTuple,
      King2dMintedEvent.OutputObject
    >;
    King2dMinted: TypedContractEvent<
      King2dMintedEvent.InputTuple,
      King2dMintedEvent.OutputTuple,
      King2dMintedEvent.OutputObject
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
