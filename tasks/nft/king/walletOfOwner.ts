import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
import { King, King__factory } from "@orivium/types";

task("king:wallet", "get wallet of owner")
  .addParam("owner", "owner address")
  .setAction(
    async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      const kingAddress = (await hre.deployments.get("King")).address;
      const accounts = await hre.ethers.getSigners();
      const signer = accounts[0];
      if (!signer) throw new Error("missing signer");

      const king: King = King__factory.connect(kingAddress, signer);
      const wallet = await king.walletOfOwner(taskArguments.owner);
      console.log(`${taskArguments.owner} has ${wallet.length} king nft(s)`);
      console.log(wallet);
    }
  );
