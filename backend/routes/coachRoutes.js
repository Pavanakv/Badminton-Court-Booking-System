const express = require("express");
const Coach = require("../models/Coach");

const router = express.Router();

router.get("/", async (req, res) => {
  const coaches = await Coach.find();
  res.json(coaches);
});

router.post("/", async (req, res) => {
  const coach = await Coach.create(req.body);
  res.json(coach);
});

router.put("/:id", async (req, res) => {
  const updated = await Coach.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});


router.delete("/:id", async (req, res) => {
  await Coach.findByIdAndDelete(req.params.id);
  res.json({ message: "Coach deleted" });
});

module.exports = router;
