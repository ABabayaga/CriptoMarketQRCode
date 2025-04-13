const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ timestamp: -1 });

    const total = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);

    const recent = payments.slice(0, 3).map((p) => ({
      amount: p.amount,
      from: p.payer,
      timestamp: p.timestamp,
    }));

    const lastPayment = recent[0] || null;

    res.json({
      totalReceived: total.toFixed(3),
      lastPayment,
      recentPayments: recent,
      monitorActive: true, // pode ser dinâmico depois
    });
  } catch (err) {
    console.error("❌ Erro ao gerar dashboard:", err);
    res.status(500).json({ error: "Erro ao gerar dashboard" });
  }
});

module.exports = router;
