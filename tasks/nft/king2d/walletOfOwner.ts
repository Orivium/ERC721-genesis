import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
import { King2d, King2d__factory } from "@orivium/types";

task("king2d:wallet", "get wallet of owner")
  .addParam("owner", "owner address")
  .setAction(
    async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      const king2dAddress = (await hre.deployments.get("King2d")).address;
      const accounts = await hre.ethers.getSigners();
      const signer = accounts[0];
      if (!signer) throw new Error("missing signer");

      const king2d: King2d = King2d__factory.connect(king2dAddress, signer);
      const wallet = await king2d.walletOfOwner(taskArguments.owner);
      console.log(`${taskArguments.owner} has ${wallet.length} king2d nft(s)`);
      console.log(wallet);
    }
  );
