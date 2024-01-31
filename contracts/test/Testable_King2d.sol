//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { King2d } from "../token/ERC721/King2d.sol";

contract Testable_King2d is King2d {
	constructor() King2d("0x1", "0x2", block.timestamp, _msgSender()) {}

	function mint(address _to, uint256 _tokenId) external {
		_mint(_to, _tokenId);
	}

	function burn(uint256 _tokenId) external {
		_burn(_tokenId);
	}
}
