const mongoose = require("mongoose");

const CoachSchema = new mongoose.Schema({
  name: { type: String, required: true },

  availability: [
    {
      day: { type: Number, required: true },       
      startHour: { type: Number, required: true }, 
      endHour: { type: Number, required: true }    
    }
  ],

  available: { type: Boolean, default: true },   

  pricePerHour: { type: Number, required: true }
});

module.exports = mongoose.model("Coach", CoachSchema);
