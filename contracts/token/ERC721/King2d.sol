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
error MintPhaseNotStarted();
error SoldOut();
error MaxAmountMinted();
error MaxWLAmountMinted();

contract King2d is ERC721, ReentrancyGuard, MerkleTreeWhitelist {
	uint256 private _tokenIdTracker;

	uint256 public constant TOTAL_SUPPLY = 4444;
	uint256 public constant AMOUNT_ON_FREE_MINT = 4300;
	uint256 public constant MAX_WALLET_AMOUNT = 5;

	// Mint phases timestamps
	uint256 public immutable OPEN;
	uint256 public immutable WHITELIST;
	uint256 public immutable OG;

	address public immutable ORIVIUM_MULTI_SIG_WALLET;

	// Mapping between wallet and amount of nft minted
	mapping(address => uint256) public mintedAmount;

	// Mapping between wallet and if it has already minted during OG or whitelist phase
	mapping(address => bool) public whitelistMint;

	event King2dMinted(address minter, uint256 indexed tokenId);

	constructor(
		bytes32 _whitelistMerkleRoot,
		bytes32 _ogWhitelistMerkleRoot,
		uint256 _openMintTimestamp,
		address _oriviumMultiSigWallet
	)
		MerkleTreeWhitelist(_whitelistMerkleRoot, _ogWhitelistMerkleRoot)
		ERC721("King2d", "KING2D")
	{
		if (_oriviumMultiSigWallet == address(0)) revert MultiSigIsZeroAddress();
		ORIVIUM_MULTI_SIG_WALLET = _oriviumMultiSigWallet;
		OPEN = _openMintTimestamp;
		WHITELIST = OPEN - 2 hours;
		OG = WHITELIST - 2 hours;

		// Minting 144 reserved tokens to the Orivium multisig wallet,
		// these tokens will be used for partnerships and marketing purposes
		for (uint256 i = AMOUNT_ON_FREE_MINT + 1; i <= TOTAL_SUPPLY; i += 1) {
			_safeMint(_oriviumMultiSigWallet, i);
		}
	}

	function _baseURI() internal view virtual override returns (string memory) {
		return "https://nft.orivium.io/nft/king2d/";
	}

	/*********************************************
	 *                  MINT INFOS               *
	 *                                           *
	 * Amount to mint: 4300                      *
	 *                                           *
	 * Limit:                                    *
	 * 	- 1 during OG and Whitelist phase        *
	 *  - a total of 5 per wallet                *
	 *                                           *
	 * Phases:                                   *
	 * - OG: 2 hours before whitelist mint       *
	 * - Whitelist: 2 hours before open mint     *
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
		if (_tokenIdTracker >= AMOUNT_ON_FREE_MINT) revert SoldOut();
		if (mintedAmount[_to] >= MAX_WALLET_AMOUNT) revert MaxAmountMinted();
		mintedAmount[_to] += 1;
		__freeMint(_to);
	}

	function _freeBatchMint(address _to, uint256 _batch) private {
		if (_tokenIdTracker + _batch > AMOUNT_ON_FREE_MINT) revert SoldOut();
		if (mintedAmount[_to] + _batch > MAX_WALLET_AMOUNT) revert MaxAmountMinted();
		mintedAmount[_to] += _batch;
		for (uint256 i; i < _batch; i += 1) {
			__freeMint(_to);
		}
	}

	function __freeMint(address _to) private {
		_tokenIdTracker += 1;
		emit King2dMinted(_to, _tokenIdTracker);
		_safeMint(_to, _tokenIdTracker);
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
