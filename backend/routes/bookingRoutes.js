const express = require("express");
const Booking = require("../models/Booking");

const { 
  isCourtAvailable, 
  isEquipmentAvailable 
} = require("../utils/availability");

const isCoachAvailable = require("../utils/coachAvailability");
const Coach = require("../models/Coach");

const { calculatePrice } = require("../utils/pricing");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { court, equipment, coach, startTime, endTime } = req.body;

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start) {
      return res.status(400).json({ error: "End time must be after start time" });
    }

    const courtFree = await isCourtAvailable(court, start, end);
    if (!courtFree) {
      return res.status(400).json({ error: "Court not available" });
    }

    if (coach) {
      const coachData = await Coach.findById(coach);
      const coachFree = await isCoachAvailable(coachData, start, end);

      if (!coachFree) {
        return res.status(400).json({ error: "Coach not available for this slot" });
      }
    }

    const equipmentFree = await isEquipmentAvailable(equipment, start, end);
    if (!equipmentFree) {
      return res.status(400).json({ error: "Equipment not available" });
    }

    const price = await calculatePrice(court, equipment, coach, start);

    const booking = await Booking.create({
      court,
      equipment,
      coach: coach || null,
      startTime: start,
      endTime: end,
      pricingBreakdown: price
    });

    return res.json({
      success: true,
      message: "Booking confirmed",
      booking
    });

  } catch (err) {
    console.error("BOOKING ERROR:", err);
    return res.status(500).json({ error: "Server error: " + err.message });
  }
});

module.exports = router;
