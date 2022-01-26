const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account Balance: ", accountBalance.toString());

  const thumbsUpContractFactory = await hre.ethers.getContractFactory("ThumbsUpPortal");
  const thumbsUpContract = await thumbsUpContractFactory.deploy();
  await thumbsUpContract.deployed();

  console.log("ThumbsUpPortal address: ", thumbsUpContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();