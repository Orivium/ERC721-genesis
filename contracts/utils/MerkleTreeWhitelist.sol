// contracts/utils/MerkTreeWhitelist/.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Context } from "@openzeppelin/contracts/utils/Context.sol";
import { MerkleProof } from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

error NotUniqueRootHash();
error OnlyWhitelist();
error OnlyOGWhitelist();

abstract contract MerkleTreeWhitelist is Context {
	bytes32 private root;
	bytes32 private ogRoot;

	constructor(bytes32 _root, bytes32 _ogRoot) {
		if (_root == _ogRoot) revert NotUniqueRootHash();
		root = _root;
		ogRoot = _ogRoot;
	}

	modifier onlyWL(bytes32[] calldata _proof) {
		if (!isWhitelisted(_msgSender(), _proof)) revert OnlyWhitelist();
		_;
	}

	modifier onlyOG(bytes32[] calldata _proof) {
		if (!isOGWhitelisted(_msgSender(), _proof)) revert OnlyOGWhitelist();
		_;
	}

	function isWhitelisted(address _address, bytes32[] calldata _proof) public view returns (bool) {
		bytes32 leaf = keccak256(abi.encodePacked(_address));
		return MerkleProof.verify(_proof, root, leaf);
	}

	function isOGWhitelisted(
		address _address,
		bytes32[] calldata _proof
	) public view returns (bool) {
		bytes32 leaf = keccak256(abi.encodePacked(_address));
		return MerkleProof.verify(_proof, ogRoot, leaf);
	}
}
