const main = async () => {
  const thumbsUpContractFactory = await hre.ethers.getContractFactory("ThumbsUpPortal");
  const thumbsUpContract = await thumbsUpContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001")
  });
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
