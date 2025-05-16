const express = require("express");
const router = express.Router();
const FarmerProfile = require("../models/FarmerProfile");

// POST /api/farmer-profiles/signup
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingFarmer = await FarmerProfile.findOne({ email });
    if (existingFarmer) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const newFarmer = new FarmerProfile({ fullName, email, password });
    await newFarmer.save();
    res.status(201).json({ message: "Farmer profile created", farmerId: newFarmer._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
