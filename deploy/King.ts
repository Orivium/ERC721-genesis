import { DeployFunction } from "hardhat-deploy/types";
import dotenv from "dotenv";

import { MerkleTree } from "merkletreejs";
import { getOGWhiteListedAddress, getWhiteListedAddress } from "../utils/whitelist";

dotenv.config();

const deployFunction: DeployFunction = async({ getNamedAccounts, deployments, network, ethers, run }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    if (!deployer) throw new Error("missing deployer");
    if (!process.env['NFT_API_BASE_URL']) throw new Error("NFT_API_BASE_URL environment variable is not set");

    const whitelist = await getWhiteListedAddress();
    const wlLeafs = whitelist.map((address) => ethers.keccak256(address));
    const wlMekleTree = new MerkleTree(wlLeafs, ethers.keccak256, { sortPairs: true });
    const wlRootHash = wlMekleTree.getHexRoot();

    const ogWhitelist = await getOGWhiteListedAddress();
    const ogLeafs = ogWhitelist.map((address) => ethers.keccak256(address));
    const ogMekleTree = new MerkleTree(ogLeafs, ethers.keccak256, { sortPairs: true });
    const ogRootHash = ogMekleTree.getHexRoot();

    const baseURI = `${process.env['NFT_API_BASE_URL']}/king`;
    // TODO: set price before deployment
    const price = ethers.parseEther("0.0001");

    console.log(`deploying King with baseURI ${baseURI} on network ${network.name}`);
    await deploy("King", {
        from: deployer,
        args: [
            baseURI,
            wlRootHash,
            ogRootHash,
            price
        ],
        log: true,
        waitConfirmations: network.name === "hardhat" ? 0 : 2,
    });

    if (!network.config.verify?.etherscan?.apiKey || process.env["VERIFY"] === "false") return;
    await run("verify:verify", {
        address: (await deployments.get("King")).address,
        contract: "contracts/token/ERC721/King.sol:King",
        constructorArguments: [
            baseURI,
            wlRootHash,
            ogRootHash,
        ],
    });
};

export default deployFunction;
deployFunction.tags = ['all', 'nft-genesis', 'King', 'main'];

