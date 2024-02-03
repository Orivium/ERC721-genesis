import { task } from "hardhat/config";

task("orivium:addresses", "Retrieve deployed contract addresses").setAction(
  async (_, hre) => {
    Object.entries(await hre.deployments.all()).forEach(([k, v]) => {
      console.log(k, v.address);
      for (const [key, value] of Object.entries(v)) {
        console.log(key, value);
      }
    });
  }
);
