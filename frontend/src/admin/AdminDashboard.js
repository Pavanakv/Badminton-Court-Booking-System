import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#05070F] text-white py-16 px-6">

      <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-12 tracking-wide">
        Admin Dashboard
      </h1>

      <div
        className="
          max-w-4xl mx-auto 
          bg-white/10 backdrop-blur-2xl
          border border-white/10 
          rounded-3xl p-10 
          shadow-xl shadow-black/40
        "
      >
        <h2 className="text-2xl font-bold text-cyan-300 mb-8 text-center">
          Manage Your Facility
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <Link
            to="/admin/courts"
            className="
              bg-[#0F1320] border border-white/10 
              hover:border-cyan-300 hover:bg-[#11182A]
              p-6 rounded-xl text-center 
              shadow-lg shadow-black/30 
              transition-all duration-300 
              text-white text-xl font-semibold
            "
          >
            🏟️ Manage Courts
          </Link>

          <Link
            to="/admin/equipment"
            className="
              bg-[#0F1320] border border-white/10 
              hover:border-cyan-300 hover:bg-[#11182A]
              p-6 rounded-xl text-center 
              shadow-lg shadow-black/30 
              transition-all duration-300 
              text-white text-xl font-semibold
            "
          >
            🏸 Manage Equipment
          </Link>

          <Link
            to="/admin/coaches"
            className="
              bg-[#0F1320] border border-white/10 
              hover:border-cyan-300 hover:bg-[#11182A]
              p-6 rounded-xl text-center 
              shadow-lg shadow-black/30 
              transition-all duration-300 
              text-white text-xl font-semibold
            "
          >
            👨‍🏫 Manage Coaches
          </Link>

          <Link
            to="/admin/pricing"
            className="
              bg-[#0F1320] border border-white/10 
              hover:border-cyan-300 hover:bg-[#11182A]
              p-6 rounded-xl text-center 
              shadow-lg shadow-black/30 
              transition-all duration-300 
              text-white text-xl font-semibold
            "
          >
            💰 Manage Pricing Rules
          </Link>

        </div>
      </div>
    </div>
  );
}
