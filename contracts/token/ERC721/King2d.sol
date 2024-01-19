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

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import { MerkleTreeWhitelist } from "../../utils/MerkleTreeWhitelist.sol";

error MintPhaseNotStarted();
error SoldOut();
error MaxAmountMinted();
error MaxWLAmountMinted();

contract King2d is ERC721, ReentrancyGuard, Ownable, MerkleTreeWhitelist {
	uint256 private _freeMintTokenIdTracker;
	uint256 private _reservedTokenIdTracker;

	uint256 public constant TOTAL_SUPPLY = 4444;
	uint256 public constant AMOUNT_ON_FREE_MINT = 4000;
	uint256 public constant MAX_WALLET_AMOUNT = 5;

	// Sale phases timestamps
	uint256 public constant OPEN = 1706371200; // Jan 27, 2024, 4:00:00 PM
	uint256 public constant WHITELIST = OPEN - 2 hours;
	uint256 public constant OG = WHITELIST - 2 hours;

	string public baseTokenURI;

	// Mapping between wallet and amount of nft minted
	mapping(address => uint256) public mintedAmount;

	// Mapping between wallet and if it has already minted during OG or whitelist phase
	mapping(address => bool) public whitelistMint;
	event King2dMinted(address minter, uint256 indexed tokenId);

	constructor(
		string memory baseURI,
		bytes32 _whitelistMerkleRoot,
		bytes32 _ogWhitelistMerkleRoot
	)
		MerkleTreeWhitelist(_whitelistMerkleRoot, _ogWhitelistMerkleRoot)
		ERC721("King2d", "KING2D")
		Ownable(_msgSender())
	{
		setBaseURI(baseURI);
		_reservedTokenIdTracker = AMOUNT_ON_FREE_MINT;
	}

	/*********************************************
	 *                  MINT INFOS               *
	 *                                           *
	 * Price: FREE (only gas fees)               *
	 *                                           *
	 * Amount to mint: 4000                      *
	 *                                           *
	 * Limit:                                    *
	 * 	- 1 during OG and Whitelist phase        *
	 *  - a total of 5 per wallet                *
	 *                                           *
	 * Phases:                                   *
	 * - OG: from 12:00pm to 2:00pm              *
	 * - Whitelist: from 2:00pm to 4:00pm        *
	 * - Open: from 4:00pm                       *
	 ********************************************/

	modifier mintPhase(uint256 _timestamp) {
		if (block.timestamp < _timestamp) revert MintPhaseNotStarted();
		_;
	}

	function freeMint() public nonReentrant mintPhase(OPEN) {
		_freeMint(_msgSender());
	}

	function freeBatchMint(uint256 _batch) public nonReentrant mintPhase(OPEN) {
		_freeBatchMint(_msgSender(), _batch);
	}

	function freeMintWhitelist(
		bytes32[] calldata _proof
	) public nonReentrant onlyWL(_proof) mintPhase(WHITELIST) {
		_freeMintWhitelist(_msgSender());
	}

	function freeMintOG(
		bytes32[] calldata _proof
	) public nonReentrant onlyOG(_proof) mintPhase(OG) {
		_freeMintWhitelist(_msgSender());
	}

	function walletMintable(address _wallet) public view returns (uint256) {
		return MAX_WALLET_AMOUNT - mintedAmount[_wallet];
	}

	function _freeMintWhitelist(address _to) private {
		if (whitelistMint[_to]) revert MaxWLAmountMinted();
		whitelistMint[_to] = true;
		_freeMint(_to);
	}

	function _freeMint(address _to) private {
		if (_freeMintTokenIdTracker >= AMOUNT_ON_FREE_MINT) revert SoldOut();
		if (mintedAmount[_to] >= MAX_WALLET_AMOUNT) revert MaxAmountMinted();
		mintedAmount[_to] += 1;
		__freeMint(_to);
	}

	function _freeBatchMint(address _to, uint256 _batch) private {
		if (_freeMintTokenIdTracker + _batch > AMOUNT_ON_FREE_MINT) revert SoldOut();
		if (mintedAmount[_to] + _batch > MAX_WALLET_AMOUNT) revert MaxAmountMinted();
		mintedAmount[_to] += _batch;
		for (uint256 i; i < _batch; i += 1) {
			__freeMint(_to);
		}
	}

	function __freeMint(address _to) private {
		_freeMintTokenIdTracker += 1;
		emit King2dMinted(_to, _freeMintTokenIdTracker);
		_safeMint(_to, _freeMintTokenIdTracker);
	}

	/*********************************************
	 *                 RESERVE INFOS             *
	 *                                           *
	 * Reserved for marketing purposes           *
	 *                                           *
	 * Amount reserved: 444                      *
	 ********************************************/

	function reserveMint(address _to) public onlyOwner {
		if (_reservedTokenIdTracker >= TOTAL_SUPPLY) revert SoldOut();

		_reserveMint(_to);
	}

	function reserveBatchMint(address _to, uint256 _batch) public onlyOwner {
		if (_reservedTokenIdTracker + _batch > TOTAL_SUPPLY) revert SoldOut();
		for (uint256 i; i < _batch; i += 1) {
			_reserveMint(_to);
		}
	}

	function _reserveMint(address _to) private {
		_reservedTokenIdTracker += 1;
		emit King2dMinted(_to, _reservedTokenIdTracker);
		_safeMint(_to, _reservedTokenIdTracker);
	}

	/*********************************************
	 *                  ADMIN                    *
	 ********************************************/

	function setBaseURI(string memory baseURI) public onlyOwner {
		baseTokenURI = baseURI;
	}

	function _baseURI() internal view virtual override returns (string memory) {
		return baseTokenURI;
	}

	/*********************************************
	 *                  UTILS                    *
	 ********************************************/

	function walletOfOwner(address _owner) public view returns (uint256[] memory) {
		uint256 tokenCount = balanceOf(_owner);
		uint256 index = 0;
		uint256[] memory tokensId = new uint256[](tokenCount);

		if (tokenCount == 0) return new uint256[](0);

		for (uint256 i = 1; i <= TOTAL_SUPPLY; i += 1) {
			if (_ownerOf(i) != _owner) continue;
			tokensId[index] = i;
			index++;
			if (index == tokenCount) break;
		}

		return tokensId;
	}
}
