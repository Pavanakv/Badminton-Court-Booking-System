const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

console.log("LOADED BOOKING MODEL FROM:", __filename);

const BookingSchema = new mongoose.Schema({
  userId: { type: String, default: "guest" },

  court: { type: ObjectId, ref: "Court", required: true },

  equipment: [
    {
      id: { type: ObjectId, ref: "Equipment" },
      qty: Number
    }
  ],

  coach: { type: ObjectId, ref: "Coach", required: false },

  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },

  status: {
    type: String,
    enum: ["confirmed", "cancelled", "waitlisted"],
    default: "confirmed"
  },

  pricingBreakdown: {
    base: Number,
    weekendFee: Number,
    peakFee: Number,
    equipmentFee: Number,
    coachFee: Number,
    total: Number
  }
});

module.exports = mongoose.model("Booking", BookingSchema);
