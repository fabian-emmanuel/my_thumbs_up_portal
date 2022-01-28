const main = async () => {
  const [_, randomPerson] = await hre.ethers.getSigners();
  const thumbsUpContractFactory = await  hre.ethers.getContractFactory("ThumbsUpPortal");
  const thumbsUpContract = await thumbsUpContractFactory.deploy();
  await thumbsUpContract.deployed();

  console.log("Contract deployed to: ", thumbsUpContract.address);
  // console.log("Contract deployed by: ", owner.address);

  let thumbsUpCount;
  thumbsUpCount = await thumbsUpContract.getTotalThumbsUp();
  console.log(thumbsUpCount.toNumber());

  let thumbsUpTxn = await thumbsUpContract.thumbsUp("A Message");
  await thumbsUpTxn.wait();

  thumbsUpCount = await thumbsUpContract.getTotalThumbsUp();

  thumbsUpTxn = await thumbsUpContract.connect(randomPerson).thumbsUp("Another Message");
  await thumbsUpTxn.wait();

  // thumbsUpCount = await thumbsUpContract.getTotalThumbsUp();
  let allThumbsUps = await thumbsUpContract.getAllThumbsUps();
  console.log(allThumbsUps);
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
