const Booking = require("../models/Booking");

async function isCoachAvailable(coach, startTime, endTime) {
  if (!coach.available) return false;

  const date = new Date(startTime);
  const day = date.getDay();
  const hour = date.getHours();

  const slot = coach.availability.find(a => a.day === day);

  if (!slot) return false;
  if (hour < slot.startHour || hour >= slot.endHour) return false;

  const overlapping = await Booking.findOne({
    coach: coach._id,
    status: "confirmed",
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } },
      {
        startTime: { $lte: startTime },
        endTime: { $gte: endTime }
      }
    ]
  });

  return !overlapping;
}

module.exports = isCoachAvailable;
