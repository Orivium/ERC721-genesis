// contracts/utils/MerkTreeWhitelist/.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "../utils/MerkleTreeWhitelist.sol";

contract Testable_MerkleTreeWhitelist is MerkleTreeWhitelist {
	constructor(bytes32 _root, bytes32 _ogRoot) MerkleTreeWhitelist(_root, _ogRoot) {}

	function test_isWhitelisted(
		address _address,
		bytes32[] calldata _proof
	) public view returns (bool) {
		return isWhitelisted(_address, _proof);
	}

	function test_isOGWhitelisted(
		address _address,
		bytes32[] calldata _proof
	) public view returns (bool) {
		return isOGWhitelisted(_address, _proof);
	}

	function test_OGReserved(bytes32[] calldata _proof) public onlyOG(_proof) {}

	function test_WLReserved(bytes32[] calldata _proof) public onlyWL(_proof) {}
}
