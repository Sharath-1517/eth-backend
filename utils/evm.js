const fs = require('fs');
const ethers = require('ethers');
require('dotenv').config();

const address = () => new ethers.Wallet(process.env.PRIVATE_KEY).address;

const provider = (network) =>
  new ethers.providers.JsonRpcProvider(
    require('./ChainConfig.json')[network].rpc
  );

const signer = (network) => new ethers.Wallet(process.env.PRIVATE_KEY, provider(network));

module.exports = { address, provider, signer };