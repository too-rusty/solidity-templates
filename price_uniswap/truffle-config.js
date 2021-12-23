const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()

const mnemonic_main = process.env.MNEMONIC_MAIN
const mnemonic_test = process.env.MNEMONIC_TEST


module.exports = {
  /**
   * $ truffle test --network <network-name>
   */
  
  // plugins: ["truffle-plugin-verify"],

  // api_keys: {
  //   // etherscan: polygonApiKey,
  //   polygonscan: polygonApiKey,
  //   ftmscan: ftmApiKey,
  //   bscscan: bscApiKey,
  // },

  networks: {

    matic_mumbai: {
      // matic mumbai testnet
      provider: () => new HDWalletProvider(mnemonic_test, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 20000000,
      gasPrice: 50000000000,
    },
    bsc_testnet: {
      provider: () => new HDWalletProvider(mnemonic_test,'https://data-seed-prebsc-1-s1.binance.org:8545'),
      network_id: 97,
      // confirmations: 5,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc_mainnet: {
      provider: () => new HDWalletProvider(mnemonic_main,'https://bsc-dataseed.binance.org/'),
      network_id: 56,
      // confirmations: 5,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    matic_mainnet: {
      provider: () => new HDWalletProvider(mnemonic_main, `https://polygon-rpc.com`),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 10000, // was 500 before
      skipDryRun: true,
      gas: 20000000,
      gasPrice: 50000000000, // 1 eth is the max
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.1",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};