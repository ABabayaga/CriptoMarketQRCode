// src/models/Metadata.js
const mongoose = require("mongoose");

const metadataSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Metadata", metadataSchema);
