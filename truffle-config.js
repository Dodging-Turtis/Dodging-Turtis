//jshint esversion:8
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();
const mnemonic = process.env.MNEMONIC;
const url = process.env.POLYGON_MUMBAI_RPC_URL;

module.exports = {
  contracts_build_directory: path.join(__dirname, "src/abis"),
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    binance_testnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          "https://data-seed-prebsc-1-s1.binance.org:8545"
        ),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    kovan: {
      provider: () => {
        return new HDWalletProvider(mnemonic, url);
      },
      network_id: "42",
      skipDryRun: true,
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(mnemonic, url);
      },
      network_id: "4",
      skipDryRun: true,
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, url),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  compilers: {
    solc: {
      version: "0.6.6",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  api_keys: {
    polygonscan: process.env.POLYGONSCAN_API_KEY,
  },
  plugins: ["truffle-plugin-verify"],
};
