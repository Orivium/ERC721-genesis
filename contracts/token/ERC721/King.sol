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
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import { MerkleTreeWhitelist } from "../../utils/MerkleTreeWhitelist.sol";

error MultiSigIsZeroAddress();
error SalePhaseNotStarted();
error SoldOut();
error InsufficientFunds();

contract King is ERC721, ReentrancyGuard, MerkleTreeWhitelist {
	uint256 private _tokenIdTracker;

	uint256 public constant TOTAL_SUPPLY = 4444;
	uint256 public constant AMOUNT_ON_SALE = 4300;

	// Sale phases timestamps
	uint256 public immutable OPEN;
	uint256 public immutable WHITELIST;
	uint256 public immutable OG;

	uint256 public immutable PRICE;
	address public immutable ORIVIUM_MULTI_SIG_WALLET;

	event KingPurchased(address buyer, uint256 indexed tokenId);

	constructor(
		bytes32 _whitelistMerkleRoot,
		bytes32 _ogWhitelistMerkleRoot,
		uint256 _price,
		uint256 _openSaleTimestamp,
		address _oriviumMultiSigWallet
	) MerkleTreeWhitelist(_whitelistMerkleRoot, _ogWhitelistMerkleRoot) ERC721("King", "KING") {
		if (_oriviumMultiSigWallet == address(0)) revert MultiSigIsZeroAddress();
		PRICE = _price;
		ORIVIUM_MULTI_SIG_WALLET = _oriviumMultiSigWallet;
		OPEN = _openSaleTimestamp;
		WHITELIST = OPEN - 2 hours;
		OG = WHITELIST - 2 hours;

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
	 *                  SALE INFOS               *
	 *                                           *
	 * Amount on sale: 4300                      *
	 *                                           *
	 * Limit: No limit                           *
	 *                                           *
	 * Phases:                                   *
	 * - OG: 2 hours before whitelist sale       *
	 * - Whitelist: 2 hours before open sale     *
	 ********************************************/

	modifier salePhase(uint256 _timestamp) {
		if (block.timestamp < _timestamp) revert SalePhaseNotStarted();
		_;
	}

	function purchase() public payable nonReentrant salePhase(OPEN) {
		_purchase();
	}

	function purchaseBatch(uint256 _batch) public payable nonReentrant salePhase(OPEN) {
		_purchaseBatch(_batch);
	}

	function purchaseWhitelist(
		bytes32[] calldata _proof
	) public payable nonReentrant onlyWL(_proof) salePhase(WHITELIST) {
		_purchase();
	}

	function purchaseBatchWhitelist(
		uint256 _batch,
		bytes32[] calldata _proof
	) public payable nonReentrant onlyWL(_proof) salePhase(WHITELIST) {
		_purchaseBatch(_batch);
	}

	function purchaseOG(
		bytes32[] calldata _proof
	) public payable nonReentrant onlyOG(_proof) salePhase(OG) {
		_purchase();
	}

	function purchaseBatchOG(
		uint256 _batch,
		bytes32[] calldata _proof
	) public payable nonReentrant onlyOG(_proof) salePhase(OG) {
		_purchaseBatch(_batch);
	}

	function _purchase() private {
		if (msg.value != PRICE) revert InsufficientFunds();
		if (_tokenIdTracker >= AMOUNT_ON_SALE) revert SoldOut();

		_purchaseMint();
		_transferFunds();
	}

	function _purchaseBatch(uint256 _batch) private {
		if (_tokenIdTracker + _batch > AMOUNT_ON_SALE) revert SoldOut();
		if (msg.value != PRICE * _batch) revert InsufficientFunds();

		for (uint256 i = 0; i < _batch; i += 1) {
			_purchaseMint();
		}
		_transferFunds();
	}

	function _transferFunds() private {
		payable(ORIVIUM_MULTI_SIG_WALLET).transfer(msg.value);
	}

	function _purchaseMint() private {
		_tokenIdTracker += 1;
		emit KingPurchased(_msgSender(), _tokenIdTracker);
		_safeMint(_msgSender(), _tokenIdTracker);
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
