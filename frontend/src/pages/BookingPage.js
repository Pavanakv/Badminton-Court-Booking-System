import React, { useEffect, useState } from "react";
import API from "../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingPage() {
  const [courts, setCourts] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [coaches, setCoaches] = useState([]);

  const [selectedCourt, setSelectedCourt] = useState("");
  const [equipmentQty, setEquipmentQty] = useState({});
  const [selectedCoach, setSelectedCoach] = useState("");

  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [price, setPrice] = useState(null);

  useEffect(() => {
    API.get("/courts").then((res) => setCourts(res.data));
    API.get("/equipment").then((res) => setEquipment(res.data));
    API.get("/coaches").then((res) => setCoaches(res.data));
  }, []);

  const createISO = (d, t) => {
    if (!d || !t) return null;
    return new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      t.getHours(),
      t.getMinutes()
    ).toISOString();
  };

  const fetchPrice = async () => {
    if (!selectedCourt || !startTime) return;

    const eqArr = Object.entries(equipmentQty)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => ({ id, qty: Number(qty) }));

    try {
      const res = await API.post("/pricing/preview", {
        court: selectedCourt,
        equipment: eqArr,
        coach: selectedCoach || null,
        startTime: createISO(date, startTime),
      });
      setPrice(res.data);
    } catch {}
  };

  useEffect(() => {
    fetchPrice();
  }, [selectedCourt, equipmentQty, selectedCoach, date, startTime]);

  const handleBooking = async () => {
    const startISO = createISO(date, startTime);
    const endISO = createISO(date, endTime);

    if (!startISO || !endISO) {
      return alert("Please select a valid time range");
    }

    const eqArr = Object.entries(equipmentQty)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => ({ id, qty: Number(qty) }));

    const res = await API.post("/bookings", {
      court: selectedCourt,
      equipment: eqArr,
      coach: selectedCoach || null,
      startTime: startISO,
      endTime: endISO,
    });

    alert("Booking Successful! ₹" + res.data.booking.pricingBreakdown.total);
  };

  return (
    <div className="min-h-screen bg-[#05070F] text-white pb-20 pt-20">

      <h1 className="text-center text-4xl md:text-5xl font-extrabold pt-10 tracking-wide">
        Book a Badminton Court
      </h1>
      <div className="flex flex-col lg:flex-row-reverse justify-center items-stretch gap-12 mt-12 px-6">
        <div className="w-full lg:w-[45%] rounded-3xl overflow-hidden shadow-xl flex">
          <img
            src="/assets/Court.jpg"
            alt="Badminton Court"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>

        
        <div className="w-full lg:w-[45%] bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col">
          
          <h2 className="text-2xl font-bold mb-6 text-cyan-300">
            Booking Details
          </h2>

          <label className="text-lg text-cyan-300">Select Court</label>
          <select
            value={selectedCourt}
            onChange={(e) => setSelectedCourt(e.target.value)}
            className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-gray-600 text-white"
          >
            <option value="">Choose a court...</option>
            {courts.map((c) => (
              <option key={c._id} value={c._id} className="text-black">
                {c.name} ({c.type})
              </option>
            ))}
          </select>

          <label className="text-lg text-cyan-300 mt-6 block">Date</label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            className="w-full p-3 mt-2 rounded-xl bg-black/40 border border-gray-600 text-white"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="text-lg text-cyan-300">Start Time</label>
              <DatePicker
                selected={startTime}
                onChange={(t) => setStartTime(t)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                dateFormat="h:mm aa"
                className="w-full p-3 mt-2 rounded-xl bg-black/40 border border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="text-lg text-cyan-300">End Time</label>
              <DatePicker
                selected={endTime}
                onChange={(t) => setEndTime(t)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                dateFormat="h:mm aa"
                className="w-full p-3 mt-2 rounded-xl bg-black/40 border border-gray-600 text-white"
              />
            </div>
          </div>

          <label className="text-lg text-cyan-300 mt-6 block">Coach</label>
          <select
            value={selectedCoach}
            onChange={(e) => setSelectedCoach(e.target.value)}
            className="w-full p-3 mt-2 rounded-xl bg-black/40 border border-gray-600 text-white"
          >
            <option value="">No Coach</option>
            {coaches.map((co) => (
              <option key={co._id} value={co._id} className="text-black">
                {co.name} — ₹{co.pricePerHour}
              </option>
            ))}
          </select>

          <label className="text-lg text-cyan-300 mt-6 block">Equipment</label>
          {equipment.map((eq) => (
            <div key={eq._id} className="flex justify-between items-center mt-3">
              <span>{eq.name}</span>
              <input
                type="number"
                min="0"
                placeholder="Qty"
                className="w-24 p-2 bg-black/40 border border-gray-600 rounded-xl text-white"
                onChange={(e) =>
                  setEquipmentQty({ ...equipmentQty, [eq._id]: e.target.value })
                }
              />
            </div>
          ))}
          <button
            onClick={handleBooking}
            className="w-full mt-8 py-4 text-xl font-semibold rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 shadow-lg hover:opacity-90 transition"
          >
            Book Now
          </button>
        </div>
      </div>
      {price && (
  <div
    className="
      max-w-3xl mx-auto mt-12
      bg-[#0F1320]/70 backdrop-blur-xl 
      border border-yellow-400/40 
      rounded-3xl p-10 
      shadow-[0_0_25px_rgba(255,215,0,0.15)]
      text-white
    "
  >
    <h2 className="text-3xl font-bold text-yellow-400 tracking-wide">
      Total Amount
    </h2>

    <div className="mt-6 flex justify-between items-center">
      <span className="text-lg text-gray-300">Inclusive of taxes</span>

      <p
        className="
          text-6xl font-extrabold 
          text-yellow-300 
        "
      >
        ₹{price.total}
      </p>
    </div>
  </div>
)}

    </div>
  );
}
