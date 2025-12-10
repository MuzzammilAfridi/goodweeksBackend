const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  try {
    await mongoose.connect("mongodb+srv://muzzammilafridi1319_db_user:dSZEowlEzNbUxZDj@cluster0.vztg2aw.mongodb.net/?appName=Cluster0");
    console.log("  MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
