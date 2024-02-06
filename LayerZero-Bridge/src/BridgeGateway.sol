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
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

import { Origin } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/interfaces/IOAppReceiver.sol";
import { ILayerZeroEndpointV2, MessagingFee } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";
import { OApp } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OApp.sol";

error InvalidOperator();
error InvalidDataLength();

contract BridgeGateway is IERC721Receiver, Ownable, OApp {
	IERC721 public immutable token;

	event BridgeSend(address indexed recipient, uint256 tokenId);

	event BridgeReceived(address indexed staker, address indexed erc721, uint256 tokenId);

	constructor(
		address _token,
		address _endpoint,
		address _oriviumMultiSigWallet
	) OApp(_endpoint, _oriviumMultiSigWallet) Ownable() {
		token = IERC721(_token);
	}

	function onERC721Received(
		address,
		address _from,
		uint256 _tokenId,
		bytes calldata // _data
	) external override returns (bytes4) {
		if (_msgSender() != address(token)) revert InvalidOperator();

		emit BridgeSend(_from, _tokenId);

		return this.onERC721Received.selector;
	}

	// Sends a message from the source to destination chain.
	function send(
		uint32 _dstEid,
		string memory _message,
		bytes calldata _options
	) external payable {
		bytes memory _payload = abi.encode(_message); // Encodes message as bytes.
		_lzSend(
			_dstEid, // Destination chain's endpoint ID.
			_payload, // Encoded message payload being sent.
			_options, // Message execution options (e.g., gas to use on destination).
			MessagingFee(msg.value, 0), // Fee struct containing native gas and ZRO token.
			payable(msg.sender) // The refund address in case the send call reverts.
		);
	}

	function _lzReceive(
		Origin calldata, // struct containing info about the message sender
		bytes32, // global packet identifier
		bytes calldata _payload, // encoded message payload being received
		address, // the Executor address.
		bytes calldata // arbitrary data appended by the Executor
	) internal virtual override {
		uint256 tokenId = abi.decode(_payload, (uint256));
		token.safeTransferFrom(address(this), _msgSender(), tokenId);
	}

	// Override conflicting functions and modifiers from base contracts

	function _checkOwner() internal view override(Ownable) {}

	function _contextSuffixLength() internal view override returns (uint256) {}

	function _msgSender() internal view override returns (address) {}

	function _transferOwnership(address newOwner) internal override(Ownable) {}

	function owner() public view override(Ownable) returns (address) {}

	function renounceOwnership() public override(Ownable) {}

	function transferOwnership(address newOwner) public override(Ownable) {}
}
