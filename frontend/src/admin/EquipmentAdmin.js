import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function ManageEquipment() {
  const [equipment, setEquipment] = useState([]);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    const res = await API.get("/equipment");
    setEquipment(res.data);
  };

  const addEquipment = async () => {
    if (!name || !qty) return alert("Please fill all fields");

    await API.post("/equipment", { name, qty: Number(qty) });
    setName("");
    setQty("");
    loadEquipment();
  };

  return (
    <div className="min-h-screen bg-[#05070F] text-white px-6 py-12">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold tracking-wide mb-10">
        Manage Equipment
      </h1>

      <div className="max-w-3xl mx-auto">

        <div
          className="
            bg-white/10 backdrop-blur-xl 
            border border-white/10 rounded-3xl 
            p-8 mb-10 shadow-xl shadow-black/40
            hover:shadow-cyan-500/20 transition-all
          "
        >
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">
            Add New Equipment
          </h2>

          <input
            className="
              w-full p-3 mb-4 rounded-xl bg-black/40 
              border border-gray-700 text-white 
              focus:ring focus:ring-cyan-500
            "
            placeholder="Equipment Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="
              w-full p-3 mb-4 rounded-xl bg-black/40 
              border border-gray-700 text-white
              focus:ring focus:ring-cyan-500
            "
            type="number"
            placeholder="Available Quantity"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          <button
            onClick={addEquipment}
            className="
              w-full py-3 text-lg font-semibold rounded-xl 
              bg-gradient-to-r from-green-600 to-emerald-600 
              shadow-lg hover:opacity-90 transition
            "
          >
            Add Equipment
          </button>
        </div>
        <h2 className="text-2xl font-bold text-cyan-300 mb-5">
          All Equipment
        </h2>

        {equipment.map((item) => (
          <div
            key={item._id}
            className="
              bg-white/10 backdrop-blur-xl 
              border border-white/10 
              rounded-2xl p-6 mb-4
              shadow-lg shadow-black/40 
              flex justify-between items-center
            "
          >
            <p className="text-lg">
              <span className="font-semibold">{item.name}</span>
              <span className="text-gray-400"> — {item.qty} units</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
