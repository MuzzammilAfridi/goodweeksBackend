const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

const adminRoutes = require("./routes/adminRoutes.js");
const hotelRoutes = require("./routes/hotelRoutes.js");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
connectDB();

// ✅ Routes
app.use("/api/admin", adminRoutes);
app.use("/api/hotels", hotelRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Goodweeks Backend Running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
