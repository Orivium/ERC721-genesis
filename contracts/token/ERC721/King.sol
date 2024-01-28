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

error MultiSigIsZeroAddress();
error SalePhaseNotStarted();
error SoldOut();
error InsufficientFunds();

contract King is ERC721, ReentrancyGuard, MerkleTreeWhitelist, Ownable {
	uint256 private _tokenIdTracker;

	uint256 public constant TOTAL_SUPPLY = 4444;
	uint256 public constant AMOUNT_ON_SALE = 4300;

	uint256 public constant OG_PRICE = 0.06 ether;
	uint256 public constant WHITELIST_PRICE = 0.065 ether;
	uint256 public constant PRICE = 0.07 ether;

	// Sale phases timestamps
	uint256 public constant OPEN = 1706468400; // Jan 28, 2024, 7:00:00 PM UTC
	uint256 public constant WHITELIST = OPEN - 2 hours;
	uint256 public constant OG = WHITELIST - 2 hours;

	event KingPurchased(address buyer, uint256 indexed tokenId);

	constructor(
		bytes32 _whitelistMerkleRoot,
		bytes32 _ogWhitelistMerkleRoot,
		address _oriviumMultiSigWallet
	)
		MerkleTreeWhitelist(_whitelistMerkleRoot, _ogWhitelistMerkleRoot)
		ERC721("King", "KING")
		Ownable(_msgSender())
	{
		// Minting 144 reserved tokens to the Orivium multisig wallet,
		// these tokens will be used for partnerships and marketing purposes
		for (uint256 i = AMOUNT_ON_SALE + 1; i <= TOTAL_SUPPLY; i += 1) {
			_safeMint(_oriviumMultiSigWallet, i);
		}
	}

	function _baseURI() internal view virtual override returns (string memory) {
		return "https://nft.orivium.io/nft/king/";
	}

	/*********************************************
	 *                    SALES                  *
	 ********************************************/

	modifier salePhase(uint256 _timestamp) {
		if (block.timestamp < _timestamp) revert SalePhaseNotStarted();
		_;
	}

	function purchase() public payable nonReentrant salePhase(OPEN) {
		_purchase(PRICE);
	}

	function purchaseBatch(uint256 _batch) public payable nonReentrant salePhase(OPEN) {
		_purchaseBatch(_batch, PRICE);
	}

	function purchaseWhitelist(
		bytes32[] calldata _proof
	) public payable nonReentrant onlyWL(_proof) salePhase(WHITELIST) {
		_purchase(WHITELIST_PRICE);
	}

	function purchaseBatchWhitelist(
		uint256 _batch,
		bytes32[] calldata _proof
	) public payable nonReentrant onlyWL(_proof) salePhase(WHITELIST) {
		_purchaseBatch(_batch, WHITELIST_PRICE);
	}

	function purchaseOG(
		bytes32[] calldata _proof
	) public payable nonReentrant onlyOG(_proof) salePhase(OG) {
		_purchase(OG_PRICE);
	}

	function purchaseBatchOG(
		uint256 _batch,
		bytes32[] calldata _proof
	) public payable nonReentrant onlyOG(_proof) salePhase(OG) {
		_purchaseBatch(_batch, OG_PRICE);
	}

	function _purchase(uint _unitPrice) private {
		if (msg.value != _unitPrice) revert InsufficientFunds();
		if (_tokenIdTracker >= AMOUNT_ON_SALE) revert SoldOut();

		_purchaseMint();
		_transferFunds();
	}

	function _purchaseBatch(uint256 _batch, uint256 _unitPrice) private {
		if (_tokenIdTracker + _batch > AMOUNT_ON_SALE) revert SoldOut();
		if (msg.value != _unitPrice * _batch) revert InsufficientFunds();

		for (uint256 i = 0; i < _batch; i += 1) {
			_purchaseMint();
		}
		_transferFunds();
	}

	function _transferFunds() private {
		payable(owner()).transfer(msg.value);
	}

	function _purchaseMint() private {
		_tokenIdTracker += 1;
		emit KingPurchased(_msgSender(), _tokenIdTracker);
		_safeMint(_msgSender(), _tokenIdTracker);
	}

	/*********************************************
	 *                  UTILS                    *
	 ********************************************/

	function totalSupply() public view returns (uint256) {
		return _tokenIdTracker + (TOTAL_SUPPLY - AMOUNT_ON_SALE);
	}

	function walletOfOwner(address _address) public view returns (uint256[] memory) {
		uint256 tokenCount = balanceOf(_address);
		uint256 index = 0;
		uint256[] memory tokensId = new uint256[](tokenCount);

		if (tokenCount == 0) return new uint256[](0);

		for (uint256 i = 1; i <= TOTAL_SUPPLY; i += 1) {
			if (_ownerOf(i) != _address) continue;
			tokensId[index] = i;
			index++;
			if (index == tokenCount) break;
		}

		return tokensId;
	}
}
