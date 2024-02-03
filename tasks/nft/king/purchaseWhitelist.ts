import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
import MerkleTree from "merkletreejs";
import { King, King__factory } from "@orivium/types";
import { getWhiteListedAddress } from "../../../utils/whitelist";

task("king:purchase-wl", "buy king nft")
  .addOptionalParam("batch", "batch size", "1")
  .setAction(
    async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      const kingAddress = (await hre.deployments.get("King")).address;
      const accounts = await hre.ethers.getSigners();
      const signer = accounts[0];
      if (!signer) throw new Error("missing signer");

      const whitelist = await getWhiteListedAddress();
      const leafs = whitelist.map((address) => hre.ethers.keccak256(address));
      const merkleTree = new MerkleTree(leafs, hre.ethers.keccak256, {
        sortPairs: true,
      });
      const proof = merkleTree.getHexProof(
        hre.ethers.keccak256(signer.address)
      );

      const king: King = King__factory.connect(kingAddress, signer);
      if (taskArguments.batch === "1") {
        const res = await king.purchaseWhitelist(proof, {
          value: await king.PRICE(),
        });
        await res.wait();
      } else {
        const res = await king.purchaseBatchWhitelist(
          taskArguments.batch,
          proof,
          { value: (await king.PRICE()) * BigInt(taskArguments.batch) }
        );
        await res.wait();
      }
      console.log(
        `Successfully purchased ${taskArguments.batch} king nft(s) by ${signer.address}`
      );
    }
  );
