require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/11l_n8muyvYgDGnMj1CwWLaFYL4P1nys",
      accounts: ["0b6409e7a11668c44c4cae32c11ba4c79c995f56603265d7abcd4049d9f0f3af"]
    },
  },
};
