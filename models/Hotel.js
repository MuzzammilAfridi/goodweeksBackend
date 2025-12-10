const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    basePrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", HotelSchema);

module.exports = Hotel;
