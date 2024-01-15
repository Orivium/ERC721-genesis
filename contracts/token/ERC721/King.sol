//SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import { MerkleTreeWhitelist } from "../../utils/MerkleTreeWhitelist.sol";

error SalePhaseNotStarted();
error SoldOut();
error InsufficientFunds();

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

contract King is ERC721, ReentrancyGuard, Ownable, MerkleTreeWhitelist {
	uint256 private _saleTokenIdTracker;
	uint256 private _reservedTokenIdTracker;

	uint256 public constant TOTAL_SUPPLY = 4444;
	uint256 public constant AMOUNT_ON_SALE = 4000;

	// Sale phases timestamps // TODO: change this value before deploy
	uint256 public constant OPEN = 1706457600; // Jan 28, 2024, 4:00:00 PM
	uint256 public constant WHITELIST = OPEN - 2 hours;
	uint256 public constant OG = WHITELIST - 2 hours;

	uint256 public price;
	string public baseTokenURI;

	event KingPurchased(address buyer, uint256 indexed tokenId);

	constructor(
		string memory baseURI,
		bytes32 _whitelistMerkleRoot,
		bytes32 _ogWhitelistMerkleRoot,
		uint256 _price
	)
		MerkleTreeWhitelist(_whitelistMerkleRoot, _ogWhitelistMerkleRoot)
		ERC721("King", "KING")
		Ownable(_msgSender())
	{
		setBaseURI(baseURI);
		price = _price;
		_reservedTokenIdTracker = AMOUNT_ON_SALE;
	}

	/*********************************************
	 *                  SALE INFOS               *
	 *                                           *
	 * Price: TBA                                *
	 *                                           *
	 * Amount on sale: 4000                      *
	 *                                           *
	 * Limit: No limit                           *
	 *                                           *
	 * Phases:                                   *
	 * - OG: from 12:00pm to 2:00pm              *
	 * - Whitelist: from 2:00pm to 4:00pm        *
	 * - Open: from 4:00pm                       *
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
		if (msg.value != price) revert InsufficientFunds();
		if (_saleTokenIdTracker >= AMOUNT_ON_SALE) revert SoldOut();

		_purchaseMint();
	}

	function _purchaseBatch(uint256 _batch) private {
		if (_saleTokenIdTracker + _batch > AMOUNT_ON_SALE) revert SoldOut();
		if (msg.value != price * _batch) revert InsufficientFunds();

		for (uint256 i = 0; i < _batch; i += 1) {
			_purchaseMint();
		}
	}

	function _purchaseMint() private {
		_saleTokenIdTracker += 1;
		emit KingPurchased(_msgSender(), _saleTokenIdTracker);
		_safeMint(_msgSender(), _saleTokenIdTracker);
	}

	/*********************************************
	 *                RESERVE INFOS              *
	 *                                           *
	 * Reserved for marketing purposes           *
	 *                                           *
	 * Amount reserved: 444                      *
	 ********************************************/

	function reserveMint(address _to) public onlyOwner {
		if (_reservedTokenIdTracker >= TOTAL_SUPPLY) revert SoldOut();

		_reserveMint(_to);
	}

	function reserveMintBatch(address _to, uint256 _batch) public onlyOwner {
		if (_reservedTokenIdTracker + _batch > TOTAL_SUPPLY) revert SoldOut();

		for (uint256 i = 0; i < _batch; i += 1) {
			_reserveMint(_to);
		}
	}

	function _reserveMint(address _to) private {
		_reservedTokenIdTracker += 1;
		emit KingPurchased(_to, _reservedTokenIdTracker);
		_safeMint(_to, _reservedTokenIdTracker);
	}

	/*********************************************
	 *                  ADMIN                    *
	 ********************************************/

	function withdraw() public onlyOwner {
		uint256 balance = address(this).balance;
		payable(owner()).transfer(balance);
	}

	function setBaseURI(string memory baseURI) public onlyOwner {
		baseTokenURI = baseURI;
	}

	function _baseURI() internal view virtual override returns (string memory) {
		return baseTokenURI;
	}

	// TODO: use Chainlink VRF
	// function setMetadatShuffleSeed() public onlyOwner {
	// 	// TODO: implement this
	// }

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

	// // TODO: remove this method before deploy
	// function __setOpenSaleTimestamp(uint256 _timestamp) public {
	// 	openSaleTimestamp = _timestamp;
	// }

	// // TODO: remove this method before deploy
	// function __setOGWhitelistOpenSaleTimestamp(uint256 _timestamp) public {
	// 	ogWhitelistSaleTimestamp = _timestamp;
	// }

	// // TODO: remove this method before deploy
	// function __setWhitelistOpenSaleTimestamp(uint256 _timestamp) public {
	// 	whitelistSaleTimestamp = _timestamp;
	// }
}
