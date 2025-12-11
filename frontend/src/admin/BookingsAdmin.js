import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await API.get("/history");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load bookings:", err);
      alert("Could not load booking list.");
    }
    setLoading(false);
  };

 const cancelBooking = async (id) => {
  if (!window.confirm("Cancel this booking?")) return;

  try {
    await API.put(`/history/cancel/${id}`);
    alert("Booking Cancelled");
    loadBookings();
  } catch (err) {
    console.error("Cancel error:", err);
    alert("Failed to cancel booking");
  }
};

const deleteBooking = async (id) => {
  if (!window.confirm("Permanently delete this booking?")) return;

  try {
    await API.delete(`/history/${id}`);
    alert("Booking Deleted");
    loadBookings();
  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete booking");
  }
};


  if (loading)
  return (
    <div className="min-h-screen bg-[#05070F] text-white pt-20 flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent"></div>
    </div>
  );


  return (
    <div className="min-h-screen bg-[#05070F] text-white pt-14 pb-20 px-6">

      <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-10 tracking-wide">
        All Bookings
      </h1>

      <div className="max-w-5xl mx-auto">
        {bookings.length === 0 && (
          <p className="text-gray-400 text-lg text-center">
            No bookings found.
          </p>
        )}

        {bookings.map((item) => (
          <div
            key={item._id}
            className="
              bg-white/10 backdrop-blur-xl 
              border border-white/10 
              rounded-3xl p-6 mb-6
              shadow-xl shadow-black/40
              hover:shadow-cyan-500/20
              transition-all
            "
          >
  
            <h2 className="text-2xl font-bold text-cyan-300 mb-3">
              {item.court?.name} ({item.court?.type})
            </h2>

            <div className="space-y-1 text-gray-300">
              <p>
                <b className="text-white">Time:</b>{" "}
                {new Date(item.startTime).toLocaleString()} →{" "}
                {new Date(item.endTime).toLocaleString()}
              </p>

              <p>
                <b className="text-white">Coach:</b>{" "}
                {item.coach?.name || "No Coach"}
              </p>

              <p>
                <b className="text-white">Equipment:</b>{" "}
                {item.equipment.length === 0
                  ? "None"
                  : item.equipment
                      .map((e) => `${e.id?.name} x${e.qty}`)
                      .join(", ")}
              </p>

              <p>
                <b className="text-white">Status:</b>{" "}
                <span
                  className={`font-bold ${
                    item.status === "cancelled"
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  {item.status}
                </span>
              </p>

              <p className="font-semibold text-yellow-300 text-lg pt-1">
                Total Amount: ₹{item.pricingBreakdown?.total}
              </p>
            </div>

            <div className="flex gap-4 mt-6">

              {item.status !== "cancelled" && (
                <button
                  onClick={() => cancelBooking(item._id)}
                  className="
                    bg-orange-600 hover:bg-orange-700
                    px-5 py-2 rounded-xl
                    text-white font-semibold
                    shadow-md
                    transition
                  "
                >
                  Cancel Booking
                </button>
              )}

              <button
                onClick={() => deleteBooking(item._id)}
                className="
                  bg-red-600 hover:bg-red-700
                  px-5 py-2 rounded-xl
                  text-white font-semibold
                  shadow-md
                  transition
                "
              >
                Delete Booking
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
