const express = require("express");
const { calculatePrice } = require("../utils/pricing");

const router = express.Router();

router.post("/preview", async (req, res) => {
  try {
    const { court, equipment, coach, startTime } = req.body;

    const price = await calculatePrice(court, equipment, coach, new Date(startTime));

    res.json(price);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
