const express = require("express");
const Court = require("../models/Court");

const router = express.Router();

router.get("/", async (req, res) => {
  const courts = await Court.find();
  res.json(courts);
});

router.post("/", async (req, res) => {
  const court = await Court.create(req.body);
  res.json(court);
});

router.put("/:id", async (req, res) => {
  const updated = await Court.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Court.findByIdAndDelete(req.params.id);
  res.json({ message: "Court deleted" });
});

module.exports = router;
