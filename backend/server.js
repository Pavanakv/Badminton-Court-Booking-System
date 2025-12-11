const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://badminton-court-booking-system-gg0jph1bc-pavana-k-vs-projects.vercel.app",
      "https://badminton-court-booking-system.vercel.app",
      process.env.FRONTEND_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);



app.get("/", (req, res) => res.send("Backend is running..."));


function sanitizeMongoUri(uri) {
  if (!uri) return uri;
  try {
    const url = new URL(uri);
    const removeKeys = ["usenewurlparser", "useunifiedtopology"];
    removeKeys.forEach((k) => {
      if (url.searchParams.has(k)) url.searchParams.delete(k);
    });
    return url.toString();
  } catch (err) {
    return uri;
  }
}

async function startServer() {
  const rawUri = process.env.MONGO_URL;
  const mongoUri = sanitizeMongoUri(rawUri);

  if (!mongoUri) {
    console.warn("MONGO_URL is not set. Set backend/.env or Render env vars.");
  } else if (mongoUri !== rawUri) {
    console.log("Sanitized MONGO_URL to remove unsupported options.");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Error:", err);
  }

  app.use("/courts", require("./routes/courtRoutes"));
  app.use("/equipment", require("./routes/equipmentRoutes"));
  app.use("/coaches", require("./routes/coachRoutes"));
  app.use("/bookings", require("./routes/bookingRoutes"));
  app.use("/pricing", require("./routes/priceRoutes"));
  app.use("/history", require("./routes/historyRoutes"));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
}

startServer();
