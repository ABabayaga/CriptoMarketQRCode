require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const startListener = require("./listener"); // Opcional, se estiver usando eventos
const startBNBMonitor = require("./services/monitorBNB");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/payments", require("./routes/payments"));
app.use("/api/dashboard", require("./routes/dashboard"));


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
  
    startListener(); // escuta eventos do contrato
    startBNBMonitor();     // Para pagamentos diretos BNB
  });
