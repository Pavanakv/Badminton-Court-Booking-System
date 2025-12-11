const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

console.log("LOADED HISTORY ROUTE FROM:", __filename);
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({ path: "court", strictPopulate: false })
      .populate({ path: "coach", strictPopulate: false })
      .populate({ path: "equipment.id", strictPopulate: false })
      .sort({ startTime: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("HISTORY ERROR:", error);
    res.status(500).json({ error: "Failed to load history" });
  }
});

router.put("/cancel/:id", async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    res.json({ success: true, booking: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to cancel booking" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error while deleting booking" });
  }
});


module.exports = router;
