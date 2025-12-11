// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// --- DEBUG CORS: allow all origins while we debug ---
app.use((req, res, next) => {
  // Log the origin for debugging
  console.log("Incoming Origin:", req.headers.origin || "[no origin]");
  next();
});

// WARNING: permissive CORS for debugging only
app.use(
  cors({
    origin: true, // accept any origin (debugging). Replace later with a whitelist.
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Basic root test
app.get("/", (req, res) => res.send("Backend is running..."));

// MongoDB connect (safe)
async function connectToMongo() {
  if (global.__dbConnected) {
    return;
  }
  if (!process.env.MONGO_URL) {
    console.warn("MONGO_URL not set!");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    global.__dbConnected = true;
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Error:", err);
  }
}
connectToMongo();

// register your routes (unchanged)
app.use("/courts", require("./routes/courtRoutes"));
app.use("/equipment", require("./routes/equipmentRoutes"));
app.use("/coaches", require("./routes/coachRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));
app.use("/pricing", require("./routes/priceRoutes"));
app.use("/history", require("./routes/historyRoutes"));

// Start server using env PORT (render)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
