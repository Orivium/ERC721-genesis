/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface Testable_MerkleTreeWhitelistInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "isOGWhitelisted"
      | "isWhitelisted"
      | "test_OGReserved"
      | "test_WLReserved"
      | "test_isOGWhitelisted"
      | "test_isWhitelisted"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "isOGWhitelisted",
    values: [AddressLike, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "isWhitelisted",
    values: [AddressLike, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "test_OGReserved",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "test_WLReserved",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "test_isOGWhitelisted",
    values: [AddressLike, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "test_isWhitelisted",
    values: [AddressLike, BytesLike[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "isOGWhitelisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isWhitelisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "test_OGReserved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "test_WLReserved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "test_isOGWhitelisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "test_isWhitelisted",
    data: BytesLike
  ): Result;
}

export interface Testable_MerkleTreeWhitelist extends BaseContract {
  connect(runner?: ContractRunner | null): Testable_MerkleTreeWhitelist;
  waitForDeployment(): Promise<this>;

  interface: Testable_MerkleTreeWhitelistInterface;

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

  test_OGReserved: TypedContractMethod<
    [_proof: BytesLike[]],
    [void],
    "nonpayable"
  >;

  test_WLReserved: TypedContractMethod<
    [_proof: BytesLike[]],
    [void],
    "nonpayable"
  >;

  test_isOGWhitelisted: TypedContractMethod<
    [_address: AddressLike, _proof: BytesLike[]],
    [boolean],
    "view"
  >;

  test_isWhitelisted: TypedContractMethod<
    [_address: AddressLike, _proof: BytesLike[]],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

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
    nameOrSignature: "test_OGReserved"
  ): TypedContractMethod<[_proof: BytesLike[]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "test_WLReserved"
  ): TypedContractMethod<[_proof: BytesLike[]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "test_isOGWhitelisted"
  ): TypedContractMethod<
    [_address: AddressLike, _proof: BytesLike[]],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "test_isWhitelisted"
  ): TypedContractMethod<
    [_address: AddressLike, _proof: BytesLike[]],
    [boolean],
    "view"
  >;

  filters: {};
}