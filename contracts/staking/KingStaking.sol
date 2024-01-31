//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/***********************************************************************************************
 *               ...                                                                           *
 *         *@@@@@@@@@@@-                    .                                                  *
 *      .@@@@@@@@@@@@@@@@#                =@@@*             :@@@@                              *
 *     *@@@@@@*.   :*@@@@@@               .@@@.              @@@:                              *
 *    :@@@@@:         =@@@@@                                                                   *
 *    @@@@@:           .@@@@* %@@#@@@@@@= .@@@: @@@     #@@= @@@: @@@     :@@@ @@@%     +%@+   *
 *   .@@@@#             @@@@@ @@@@@@@@@@@@.@@@+ @@@+   -@@@ .@@@= @@@     -@@@ @@@@*   *@@@#   *
 *   .@@@@=             @@@@@.@@@@     @@@+@@@+ =@@@   @@@= .@@@=.@@@.    -@@@.@@@@@. =@@@@*   *
 *   .@@@@#             @@@@@.@@@=.   :@@@+@@@=  @@@- =@@@  .@@@=.@@@.    -@@@.@@@@@@.@@@@@-   *
 *    @@@@@.           .@@@@@.@@@=@@@@@@@*.@@@-  #@@%.@@@:  .@@@: @@@:    =@@@.@@@@@@@@@@@@-   *
 *    .@@@@@.         :@@@@@- @@@::@@@@*  .@@@-  :@@@#@@%   .@@@. #@@@.  :@@@@.@@@*%@@@@@@@-   *
 *     +@@@@@@*:  .-#@@@@@@-  @@@.  @@@*  .@@@:   @@@@@@.    @@@. .@@@@@@@@@@: @@@* @@# @@@.   *
 *      .@@@@@@@@@@@@@@@@@    -==    ===   ===    :@@@@+     ===    :@@@@@@:   -==.  -  ###    *
 *        .%@@@@@@@@@@@+                                                                       *
 *             -+++:                                                                           *
 *                                                                                             *
 **********************************************************************************************/

import { IERC721Receiver } from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { Context } from "@openzeppelin/contracts/utils/Context.sol";

import { King } from "../token/ERC721/King.sol";
import { King2d } from "../token/ERC721/King2d.sol";

error InvalidOperator();
error InvalidDataLength();
error InvalidMinimumLockTime();
error InvalidContract();

contract KingStaking is IERC721Receiver, Context {
	King public immutable king;
	King2d public immutable king2d;

	uint256 public constant MINIMUM_LOCK_TIME = 7 days;

	// may be optimize with only 2 mapping with a hash of erc721 and tokenId
	// staker ==> erc721 ==> tokenId ==> minimumLockTime
	mapping(address => mapping(address => mapping(uint256 => uint256))) public stakingInfos;

	event Staked(
		address indexed staker,
		address indexed erc721,
		uint256 tokenId,
		uint256 minimumLockTime
	);

	event Unstaked(address indexed staker, address indexed erc721, uint256 tokenId);

	constructor(address _king, address _king2d) {
		king = King(_king);
		king2d = King2d(_king2d);
	}

	function onERC721Received(
		address,
		address _from,
		uint256 _tokenId,
		bytes calldata _data
	) external override returns (bytes4) {
		if (_msgSender() != address(king) && _msgSender() != address(king2d))
			revert InvalidOperator();
		if (_data.length != 32) revert InvalidDataLength();

		uint256 minimumLockTime = abi.decode(_data, (uint256));

		if (minimumLockTime < MINIMUM_LOCK_TIME) revert InvalidMinimumLockTime();

		emit Staked(_from, _msgSender(), _tokenId, minimumLockTime);

		stakingInfos[_from][_msgSender()][_tokenId] = minimumLockTime;
		return this.onERC721Received.selector;
	}

	function unstake(address _erc721, uint256 _tokenId) external {
		if (stakingInfos[_msgSender()][_erc721][_tokenId] == 0) revert InvalidOperator();
		delete stakingInfos[_msgSender()][_erc721][_tokenId];

		emit Unstaked(_msgSender(), _erc721, _tokenId);

		IERC721(_erc721).safeTransferFrom(address(this), _msgSender(), _tokenId);
	}
}
