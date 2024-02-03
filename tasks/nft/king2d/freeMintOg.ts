import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
import MerkleTree from "merkletreejs";
import { King2d, King2d__factory } from "@orivium/types";
import { getOGWhiteListedAddress } from "../../../utils/whitelist";

task("king2d:free-mint-og", "mint king2d nft").setAction(
  async (_: TaskArguments, hre: HardhatRuntimeEnvironment) => {
    const king2dAddress = (await hre.deployments.get("King2d")).address;
    const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];
    if (!signer) throw new Error("missing signer");

    const ogWhitelist = await getOGWhiteListedAddress();
    const leafs = ogWhitelist.map((address) => hre.ethers.keccak256(address));
    const merkleTree = new MerkleTree(leafs, hre.ethers.keccak256, {
      sortPairs: true,
    });
    const proof = merkleTree.getHexProof(hre.ethers.keccak256(signer.address));

    const king2d: King2d = King2d__factory.connect(king2dAddress, signer);

    const res = await king2d.freeMintWhitelist(proof);
    await res.wait();
    console.log(`Successfully free mint king2d by ${signer.address}`);
  }
);
