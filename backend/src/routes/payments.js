const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// GET /api/payments?merchant=0x...
router.get("/", async (req, res) => {
    const merchant = req.query.merchant?.toLowerCase();

    const query = merchant ? { merchant } : {};
    const payments = await Payment.find(query).sort({ timestamp: -1 });

    res.json(payments);
});

// POST /api/payments/save
router.post("/save", async (req, res) => {
    const { txHash, payer, merchant, amount, timestamp } = req.body;

    if (!txHash || !payer || !merchant || !amount || !timestamp) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const existing = await Payment.findOne({ txHash });
    if (existing) {
        return res.status(200).json({ message: "Pagamento já salvo" });
    }

    const payment = await Payment.create({
        txHash,
        payer,
        merchant: merchant.toLowerCase(),
        amount,
        timestamp,
    });

    res.status(201).json(payment);
});

module.exports = router;
