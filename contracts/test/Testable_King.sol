//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { King } from "../token/ERC721/King.sol";

contract Testable_King is King {
    constructor() King("0x1", "0x2", _msgSender()) {}

    function mint(address _to, uint256 _tokenId) external {
        _mint(_to, _tokenId);
    }

    function burn(uint256 _tokenId) external {
        _burn(_tokenId);
    }
}