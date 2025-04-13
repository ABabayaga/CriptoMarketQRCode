const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  txHash: { type: String, required: true, unique: true },
  payer: { type: String, required: true },
  merchant: { type: String, required: true },
  amount: { type: String, required: true },
  timestamp: { type: Number, required: true }
});

module.exports = mongoose.model("Payment", paymentSchema);
