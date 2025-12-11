import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function ManageCourts() {
  const [courts, setCourts] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("indoor");

  useEffect(() => {
    loadCourts();
  }, []);

  const loadCourts = async () => {
    const res = await API.get("/courts");
    setCourts(res.data);
  };

  const addCourt = async () => {
    if (!name) return alert("Court name is required");

    await API.post("/courts", { name, type });
    setName("");
    loadCourts();
  };

  return (
    <div className="min-h-screen bg-[#05070F] text-white px-6 py-12">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold tracking-wide mb-10">
        Manage Courts
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
            Add New Court
          </h2>
          <input
            className="
              w-full p-3 rounded-xl bg-black/40 
              border border-gray-700 text-white
              mb-4 focus:ring focus:ring-cyan-500
            "
            placeholder="Court Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="
              w-full p-3 rounded-xl bg-black/40 
              border border-gray-700 text-white
              mb-4 focus:ring focus:ring-cyan-500
            "
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="indoor" className="text-black">Indoor</option>
            <option value="outdoor" className="text-black">Outdoor</option>
          </select>
          <button
            onClick={addCourt}
            className="
              w-full py-3 text-lg font-semibold rounded-xl 
              bg-gradient-to-r from-blue-600 to-cyan-600 
              shadow-lg hover:opacity-90 transition
            "
          >
            Add Court
          </button>
        </div>

        <h2 className="text-2xl font-bold text-cyan-300 mb-5">
          All Courts
        </h2>

        {courts.map((court) => (
          <div
            key={court._id}
            className="
              bg-white/10 backdrop-blur-xl 
              border border-white/10 
              rounded-2xl p-6 
              shadow-lg shadow-black/40 
              mb-4 flex justify-between items-center
            "
          >
            <p className="text-lg">
              <span className="font-semibold">{court.name}</span>
              <span className="text-gray-400"> — {court.type}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
