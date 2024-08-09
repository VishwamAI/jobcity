const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const JobCity = await hre.ethers.getContractFactory("JobCity");
  const jobCity = await JobCity.deploy("Job-City Platform");

  await jobCity.waitForDeployment();

  console.log("JobCity contract deployed to:", await jobCity.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
