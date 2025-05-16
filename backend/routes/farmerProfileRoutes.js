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

// GET /api/farmer-profiles/:id  (get farmer detail by their id)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const farmer = await FarmerProfile.findById(id).select("-password"); // exclude password

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.status(200).json(farmer);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


module.exports = router;
