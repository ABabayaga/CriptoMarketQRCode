const { ethers } = require("ethers");
const Payment = require("../models/Payment");
const Metadata = require("../models/Metadata");
require("dotenv").config();

async function startBNBMonitor() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const monitorAddress = process.env.MONITOR_ADDRESS.toLowerCase();

  console.log("🚀 Monitor BNB iniciado");

  let lastBlockDoc = await Metadata.findOne({ key: "last_bnb_block" });
  let startBlock;
  const currentBlock = await provider.getBlockNumber();

  if (!lastBlockDoc) {
    startBlock = currentBlock;
    await Metadata.create({ key: "last_bnb_block", value: startBlock });
  } else {
    startBlock = lastBlockDoc.value;
  }

  // ✅ Limite de reprocessamento: se estiver muito atrasado, atualiza
  if (currentBlock - startBlock > 500) {
    console.warn(`⚠️ startBlock (${startBlock}) estava muito atrasado em relação ao bloco atual (${currentBlock}), ajustando...`);
    startBlock = currentBlock - 10;
    await Metadata.updateOne(
      { key: "last_bnb_block" },
      { value: startBlock, updatedAt: new Date() }
    );
  }


  provider.on("block", async (blockNumber) => {
    for (let i = startBlock + 1; i <= blockNumber; i++) {
      try {
        const block = await provider.send("eth_getBlockByNumber", [
          "0x" + i.toString(16),
          true,
        ]);
        if (!block || !block.transactions) continue;

        for (const tx of block.transactions) {
          if (!tx.to || tx.to.toLowerCase() !== monitorAddress) continue;

          const exists = await Payment.findOne({ txHash: tx.hash });
          if (exists) continue;

          try {
            await Payment.create({
              txHash: tx.hash,
              payer: tx.from,
              merchant: tx.to.toLowerCase(),
              amount: ethers.formatEther(tx.value),
              timestamp: parseInt(block.timestamp),
            });

            console.log(`💰 Pagamento BNB recebido - Bloco ${i}`);
          } catch (err) {
            if (err.code === 11000) {
              console.warn("⚠️ Transação já registrada:", tx.hash);
            } else {
              console.error("❌ Erro ao salvar pagamento:", err);
            }
          }
        }

        await Metadata.updateOne(
          { key: "last_bnb_block" },
          { value: i, updatedAt: new Date() }
        );

        startBlock = i;
      } catch (err) {
        console.error(`❌ Erro ao processar bloco ${i}:`, err);
      }
    }
  });
}

module.exports = startBNBMonitor;