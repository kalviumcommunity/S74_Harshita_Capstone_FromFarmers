const mongoose = require("mongoose");

const farmerProfileSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true } // Store hashed password
});

module.exports = mongoose.model("FarmerProfile", farmerProfileSchema);
