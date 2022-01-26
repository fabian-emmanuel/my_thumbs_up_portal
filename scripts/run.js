const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const thumbsUpContractFactory = await  hre.ethers.getContractFactory("ThumbsUpPortal");
  const thumbsUpContract = await thumbsUpContractFactory.deploy();
  await thumbsUpContract.deployed();

  console.log("Contract deployed to: ", thumbsUpContract.address);
  console.log("Contract deployed by: ", owner.address);

  let thumbsUpCount;
  thumbsUpCount = await thumbsUpContract.getTotalThumbsUp();

  let waveTxn = await thumbsUpContract.thumbsUp();
  await waveTxn.wait();

  thumbsUpCount = await thumbsUpContract.getTotalThumbsUp();

  waveTxn = await thumbsUpContract.connect(randomPerson).thumbsUp();
  await waveTxn.wait();

  thumbsUpCount = await thumbsUpContract.getTotalThumbsUp();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
};

runMain();
