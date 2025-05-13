const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/users
router.post("/", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const newUser = new User({ fullName, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
