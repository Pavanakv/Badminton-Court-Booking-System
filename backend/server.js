const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

app.use("/courts", require("./routes/courtRoutes"));
app.use("/equipment", require("./routes/equipmentRoutes"));
app.use("/coaches", require("./routes/coachRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));
app.use("/pricing", require("./routes/priceRoutes"));
app.use("/history", require("./routes/historyRoutes"));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
