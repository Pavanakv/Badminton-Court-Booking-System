const mongoose = require("mongoose");

const PricingRuleSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["surcharge", "multiplier"] },
  value: Number,
  startHour: Number,
  endHour: Number,
  days: [Number], 
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("PricingRule", PricingRuleSchema);
