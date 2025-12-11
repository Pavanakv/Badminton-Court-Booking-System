const express = require("express");
const PricingRule = require("../models/PricingRule");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await PricingRule.find());
});

router.post("/", async (req, res) => {
  res.json(await PricingRule.create(req.body));
});

router.put("/:id", async (req, res) => {
  res.json(await PricingRule.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", async (req, res) => {
  await PricingRule.findByIdAndDelete(req.params.id);
  res.json({ message: "Pricing rule deleted" });
});

module.exports = router;
