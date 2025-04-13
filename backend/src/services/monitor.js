const { ethers } = require("ethers");
const Payment = require("../models/Payment");
require("dotenv").config();

async function startListener() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

  const abi = [
    "event PaymentReceived(address indexed payer, address indexed merchant, uint256 amount, uint256 timestamp)"
  ];

  const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, provider);

  console.log("✅ Monitor de eventos iniciado");

  contract.on("PaymentReceived", async (payer, merchant, amount, timestamp, event) => {
    const txHash = event.transactionHash || event.log.transactionHash;

    if (!txHash) {
      console.error("⚠️ transactionHash não encontrado no evento:", event);
      return;
    }

    // Verifica duplicata
    const exists = await Payment.findOne({ txHash });
    if (exists) {
      console.log("🔁 Transação já registrada:", txHash);
      return;
    }

    console.log("🔔 Pagamento detectado:");
    console.log("Payer:", payer);
    console.log("Merchant:", merchant);
    console.log("Amount:", ethers.formatEther(amount));
    console.log("Timestamp:", timestamp);
    console.log("TxHash:", txHash);

    await Payment.create({
      txHash,
      payer,
      merchant: merchant.toLowerCase(),
      amount: ethers.formatEther(amount),
      timestamp: Number(timestamp),
    });
  });
}

module.exports = startListener;
