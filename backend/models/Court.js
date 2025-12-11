const mongoose = require("mongoose");

const CourtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["indoor", "outdoor"], required: true },
  isActive: { type: Boolean, default: true },
  basePrice: { type: Number, default: 300 }
});

module.exports = mongoose.model("Court", CourtSchema);
