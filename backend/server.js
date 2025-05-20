const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

// Routes
app.get('/',(req,res)=>{
  res.send("Welcome to FromFarmers  – Connecting Farmers to Consumers")
})
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/farmer-profiles", require("./routes/farmerProfileRoutes"));
app.use("/api/bulkbuddy", require("./routes/bulkBuddyRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

