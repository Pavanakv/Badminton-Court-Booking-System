const Court = require("../models/Court");
const Coach = require("../models/Coach");
const Equipment = require("../models/Equipment");

async function calculatePrice(courtId, equipmentArray, coachId, startTime) {
  let breakdown = {
    base: 0,
    indoorFee: 0,
    weekendFee: 0,
    peakFee: 0,
    equipmentFee: 0,
    coachFee: 0,
    total: 0
  };

  const court = await Court.findById(courtId);
  breakdown.base = court.basePrice;

  const date = new Date(startTime);
  const hour = date.getHours();
  const day = date.getDay(); 

  if (court.type === "indoor") {
    breakdown.indoorFee = 50;
  }

  if (day === 0 || day === 6) {
    breakdown.weekendFee = 100;
  }

  if (hour >= 18 && hour < 21) {
    breakdown.peakFee = 0.5 * breakdown.base; 
  }

  for (const eq of equipmentArray) {
    const item = await Equipment.findById(eq.id);
    breakdown.equipmentFee += item.pricePerUnit * eq.qty;
  }

  if (coachId) {
    const coach = await Coach.findById(coachId);
    breakdown.coachFee = coach.pricePerHour;
  }

  breakdown.total =
    breakdown.base +
    breakdown.indoorFee +
    breakdown.weekendFee +
    breakdown.peakFee +
    breakdown.equipmentFee +
    breakdown.coachFee;

  return breakdown;
}

module.exports = { calculatePrice };
