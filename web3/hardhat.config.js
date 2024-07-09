/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = "fef6d8f0009876f7cecfcf2deb5dbc970c3bf0a8531b0b373d7ad5f3a0ca2143";
const RPC_URL = "https://97.rpc.thirdweb.com";

module.exports = {
  defaultNetwork: "bnb_network",
  networks: {
    hardhat: {
      chainId: 97,
    },
    bnb_network: {
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
