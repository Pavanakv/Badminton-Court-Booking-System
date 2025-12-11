const express = require("express");
const Equipment = require("../models/Equipment");

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await Equipment.find();
  res.json(items);
});

router.post("/", async (req, res) => {
  const item = await Equipment.create(req.body);
  res.json(item);
});

router.put("/:id", async (req, res) => {
  const updated = await Equipment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Equipment.findByIdAndDelete(req.params.id);
  res.json({ message: "Equipment deleted" });
});

module.exports = router;
