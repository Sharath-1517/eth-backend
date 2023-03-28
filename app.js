const app = require("./utils/setup");
const { address, provider, signer } = require("./utils/evm");
const { ethers } = require("ethers");

const balance = async (network) => {
  const result = await provider(network).getBalance(address());
  return ethers.utils.formatEther(result);
};

app
  .route("/balance/:network")
  .get(async (req, res) => {
    try {

      const { network } = req.params;
      const value = await balance(network);

      res.status(200).json({
        balance: value,
        address: address()
      });

    } catch (e) {
      const error = e.toString();

      res.status(500).json({ 
        message: "Failed to fetch balance!",
        error: error
       });
    }
  })
  .post(async (req, res) => {
    try {
      const { network } = req.params;
      const { to, amount } = req.body;
      const value = ethers.utils.parseEther(amount);

      const tx = await signer(network).sendTransaction({ to, value });
      await tx.wait();
      
      res.status(200).json({
        message: "Transaction Successful!",
        transactionHash: tx.hash
      });

    } catch (e) {
      console.log(e);
      const error = e.toString();

      res.status(500).json({ 
        message: "Transaction Failed!",
        error: error
       });
    }
  });
