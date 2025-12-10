const Hotel = require("../models/Hotel.js");
const Markup = require("../models/Markup.js");

// ADD HOTEL (ADMIN)
const addHotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.json({ message: "Hotel added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  SEARCH HOTELS + APPLY MARKUP
const searchHotels = async (req, res) => {
  try {
    const { city, checkIn, checkOut } = req.body;

    if (!city || !checkIn || !checkOut) {
      return res.status(400).json({ message: "City, Check-in & Check-out required" });
    }

    const hotels = await Hotel.find({ city });

    const markupData = await Markup.findOne({ city });
    const markup = markupData ? markupData.markup : 0;

    const result = hotels.map((hotel) => ({
      ...hotel._doc,
      finalPrice: hotel.basePrice + (hotel.basePrice * markup) / 100,
      checkIn,
      checkOut,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET ALL HOTELS (for admin list)
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE HOTEL BY ID
const deleteHotel = async (req, res) => {
  try {
    const id = req.params.id;
    const removed = await Hotel.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: "Hotel not found" });
    res.json({ message: "✅ Hotel deleted successfully", removed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  addHotel,
  getAllHotels,
  deleteHotel,
  searchHotels,
};
