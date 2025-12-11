const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },          
  totalQuantity: { type: Number, required: true }, 
  pricePerUnit: { type: Number, required: true }  
});

module.exports = mongoose.model("Equipment", EquipmentSchema);
