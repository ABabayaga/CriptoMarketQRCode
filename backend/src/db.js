const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB conectado");
  } catch (err) {
    console.error("❌ Erro MongoDB", err);
  }
}

module.exports = connectDB;
