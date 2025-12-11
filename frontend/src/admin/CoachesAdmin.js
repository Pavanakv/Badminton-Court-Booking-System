import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function ManageCoaches() {
  const [coaches, setCoaches] = useState([]);
  const [name, setName] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");

  useEffect(() => {
    loadCoaches();
  }, []);

  const loadCoaches = async () => {
    const res = await API.get("/coaches");
    setCoaches(res.data);
  };

  const addCoach = async () => {
    if (!name || !pricePerHour) {
      return alert("Please fill all fields");
    }

    await API.post("/coaches", { name, pricePerHour });
    setName("");
    setPricePerHour("");
    loadCoaches();
  };

  return (
    <div className="min-h-screen bg-[#05070F] text-white px-6 py-12">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold tracking-wide mb-10">
        Manage Coaches
      </h1>

      <div className="max-w-3xl mx-auto">
        <div
          className="
            bg-white/10 backdrop-blur-xl
            border border-white/10 
            rounded-3xl p-8 shadow-xl
            shadow-black/40 hover:shadow-cyan-500/20 
            transition-all mb-10
          "
        >
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">
            Add New Coach
          </h2>
          <input
            className="
              w-full p-3 rounded-xl bg-black/40 
              border border-gray-700 text-white
              mb-4 focus:ring focus:ring-cyan-500
            "
            placeholder="Coach Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="
              w-full p-3 rounded-xl bg-black/40 
              border border-gray-700 text-white
              mb-4 focus:ring focus:ring-cyan-500
            "
            placeholder="Hourly Price (₹)"
            type="number"
            value={pricePerHour}
            onChange={(e) => setPricePerHour(e.target.value)}
          />
          <button
            onClick={addCoach}
            className="
              w-full py-3 text-lg font-semibold rounded-xl 
              bg-gradient-to-r from-purple-600 to-fuchsia-600 
              shadow-lg hover:opacity-90 transition
            "
          >
            Add Coach
          </button>
        </div>
        <h2 className="text-2xl font-bold text-cyan-300 mb-5">
          All Coaches
        </h2>

        {coaches.map((c) => (
          <div
            key={c._id}
            className="
              bg-white/10 backdrop-blur-xl 
              border border-white/10 
              rounded-2xl p-6 
              shadow-lg shadow-black/40 
              mb-4 flex justify-between items-center
            "
          >
            <p className="text-lg">
              <span className="font-semibold">{c.name}</span>
              <span className="text-gray-400"> — ₹{c.pricePerHour}/hr</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
