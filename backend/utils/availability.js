const Booking = require("../models/Booking");

function isOverlap(start1, end1, start2, end2) {
  return start1 < end2 && start2 < end1;
}

async function isCourtAvailable(courtId, startTime, endTime) {
  const bookings = await Booking.find({
    court: courtId,
    status: "confirmed"
  });

  for (let b of bookings) {
    if (isOverlap(startTime, endTime, b.startTime, b.endTime)) {
      return false;
    }
  }

  return true;
}

async function isCoachAvailable(coachId, startTime, endTime) {
  if (!coachId) return true;

  const bookings = await Booking.find({
    coach: coachId,
    status: "confirmed"
  });

  for (let b of bookings) {
    if (isOverlap(startTime, endTime, b.startTime, b.endTime)) {
      return false;
    }
  }

  return true;
}

async function isEquipmentAvailable(equipmentArray, startTime, endTime) {
  const bookings = await Booking.find({
    status: "confirmed",
    startTime: { $lt: endTime },
    endTime: { $gt: startTime }
  });

  for (let requested of equipmentArray) {
    let totalBookedQty = 0;

    for (let b of bookings) {
      for (let eq of b.equipment) {
        if (eq.id.toString() === requested.id) {
          totalBookedQty += eq.qty;
        }
      }
    }

    const Equipment = require("../models/Equipment");
    const item = await Equipment.findById(requested.id);

    if (!item) return false;

    const availableQty = item.totalQuantity - totalBookedQty;

    if (availableQty < requested.qty) {
      return false;
    }
  }

  return true;
}

module.exports = {
  isCourtAvailable,
  isCoachAvailable,
  isEquipmentAvailable
};
