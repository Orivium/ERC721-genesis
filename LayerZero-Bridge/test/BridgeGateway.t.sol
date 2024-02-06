// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { TestHelper } from "@layerzerolabs/lz-evm-oapp-v2/test/TestHelper.sol";
import { Counter } from "../src/Counter.sol";

contract TestBridgeGateway is TestHelper {
	Counter public counter;

	function setUp() public override {
		super.setUp();
		counter = new Counter();
		counter.setNumber(0);
	}

	function test_Increment() public {
		counter.increment();
		assertEq(counter.number(), 1);
	}

	function testFuzz_SetNumber(uint256 x) public {
		counter.setNumber(x);
		assertEq(counter.number(), x);
	}
}
