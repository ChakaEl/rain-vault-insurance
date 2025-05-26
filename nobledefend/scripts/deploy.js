async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const ALESC = await ethers.getContractFactory("ALESC");
  const contract = await ALESC.deploy();
  await contract.deployed();

  console.log("ALESC deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
