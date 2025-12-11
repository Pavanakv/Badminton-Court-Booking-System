import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function BookingHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await API.get("/history");
      setHistory(res.data);
    } catch (err) {
      console.error("Error loading history:", err);
      alert("Failed to load booking history");
    }
    setLoading(false);
  };

  const cancelBooking = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmCancel) return;

    try {
      await API.put(`/history/cancel/${id}`);
      alert("Booking cancelled!");
      loadHistory();
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Failed to cancel booking");
    }
  };

  if (loading)
  return (
    <div className="min-h-screen bg-[#05070F] text-white pt-28 flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05070F] text-white py-16 px-6 pt-28 pb-20">
      
      <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-10 tracking-wide">
        Booking History
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">
        {history.length === 0 && (
          <p className="text-gray-400 text-lg text-center">
            No bookings found.
          </p>
        )}

        {history.map((item) => (
          <div
            key={item._id}
            className="
              bg-white/10 backdrop-blur-2xl
              border border-white/10 
              rounded-2xl p-6 shadow-xl shadow-black/30 
              hover:shadow-cyan-500/20 transition-all duration-300
            "
          >

            <h2 className="text-2xl font-bold text-cyan-300 mb-3">
              {item.court?.name} <span className="text-gray-300">({item.court?.type})</span>
            </h2>
            <p className="text-gray-300 mb-1">
              <b className="text-white">Date:</b>{" "}
              {new Date(item.startTime).toLocaleDateString()}
            </p>

            <p className="text-gray-300 mb-1">
              <b className="text-white">Time:</b>{" "}
              {new Date(item.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} 
              {" — "}
              {new Date(item.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>

            <p className="text-gray-300 mb-1">
              <b className="text-white">Coach:</b>{" "}
              {item.coach?.name || "No Coach"}
            </p>

            <p className="text-gray-300 mb-1">
              <b className="text-white">Equipment:</b>{" "}
              {item.equipment.length === 0
                ? "None"
                : item.equipment
                    .map((e) => `${e.id?.name || "Item"} x${e.qty}`)
                    .join(", ")}
            </p>
            <p className="text-xl font-bold text-yellow-300 mt-4">
              Total Paid: ₹{item.pricingBreakdown?.total}
            </p>
            {item.status !== "cancelled" ? (
              <button
                onClick={() => cancelBooking(item._id)}
                className="
                  mt-5 bg-red-600 hover:bg-red-700 
                  text-white px-6 py-2 rounded-xl 
                  shadow-md hover:shadow-red-800/50 transition
                "
              >
                Cancel Booking
              </button>
            ) : (
              <p className="mt-5 text-red-400 font-bold">
                Booking Cancelled ❌
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
