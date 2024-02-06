// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { TestHelper } from "@layerzerolabs/lz-evm-oapp-v2/test/TestHelper.sol";

contract TestBridgeGateway is TestHelper {
	uint256 public counter;
	function setUp() public override {
		super.setUp();
		counter = 0;
	}

	function test_Increment() public {
		counter += 1;
		assertEq(counter, 1);
	}

	function testFuzz_SetNumber(uint256 x) public {
		counter += x;
		assertEq(counter, x);
	}
}
