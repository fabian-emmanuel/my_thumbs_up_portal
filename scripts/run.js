const main = async () => {
  const [_, randomPerson] = await hre.ethers.getSigners();
  const thumbsUpContractFactory = await  hre.ethers.getContractFactory("ThumbsUpPortal");
  const thumbsUpContract = await thumbsUpContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1")
  });
  await thumbsUpContract.deployed();
  console.log("Contract addy: ", thumbsUpContract
     .address);

  /*
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(
     thumbsUpContract.address
  );

  console.log(
     "Contract balance:",
     hre.ethers.utils.formatEther(contractBalance)
  );

  /*
   * Let's try two ThumbsUp now
   */

  let thumbsUpTxn = await thumbsUpContract.thumbsUp("This is thumbsUp #1");
  await thumbsUpTxn.wait();

  let thumbsUpTxn2 = await thumbsUpContract.thumbsUp("This is thumbsUp #2");
  await thumbsUpTxn2.wait();
  /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(thumbsUpContract.address);
  console.log(
     "Contract balance: ",
     hre.ethers.utils.formatEther(contractBalance)
  );

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
