const Hotel = require("../models/Hotel.js");
const Markup = require("../models/Markup.js");

function escapeRegExp(string) {
  return String(string).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ADD HOTEL (ADMIN)
const addHotel = async (req, res) => {
  try {
    const { name, city, rating, basePrice, availableFrom, availableTo } = req.body;

    // basic validation
    if (!name || !city || !basePrice || !availableFrom || !availableTo) {
      return res.status(400).json({ message: "name, city, basePrice, availableFrom and availableTo are required" });
    }

    // parse dates
    const fromDate = new Date(availableFrom);
    const toDate = new Date(availableTo);

    if (isNaN(fromDate) || isNaN(toDate)) {
      return res.status(400).json({ message: "Invalid date format for availableFrom / availableTo" });
    }

    if (fromDate > toDate) {
      return res.status(400).json({ message: "availableFrom must be before or equal to availableTo" });
    }

    const hotel = new Hotel({
      name,
      city,
      rating,
      basePrice,
      availableFrom: fromDate,
      availableTo: toDate,
    });

    await hotel.save();
    res.json({ message: "Hotel added successfully", hotel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//  SEARCH HOTELS + APPLY MARKUP
const searchHotels = async (req, res) => {
  try {
    const { city, checkIn, checkOut } = req.body;

    // Build dynamic MongoDB filter
    let filter = {};

    // CITY: case-insensitive partial match (safe)
    if (city) {
      const escaped = escapeRegExp(city.trim());
      filter.city = { $regex: new RegExp(escaped, "i") }; // use `^${escaped}$` for exact match
    }

    // DATE FILTER
    if (checkIn && checkOut) {
      const reqCheckIn = new Date(checkIn);
      const reqCheckOut = new Date(checkOut);

      if (isNaN(reqCheckIn) || isNaN(reqCheckOut)) {
        return res.status(400).json({ message: "Invalid date format" });
      }
      if (reqCheckIn > reqCheckOut) {
        return res.status(400).json({ message: "checkIn cannot be after checkOut" });
      }

      filter.availableFrom = { $lte: reqCheckIn };
      filter.availableTo = { $gte: reqCheckOut };
    }

    const hotels = await Hotel.find(filter);

    const markupData = await Markup.findOne({ city });
    const markup = markupData ? markupData.markup : 0;

    const result = hotels.map((hotel) => ({
      ...hotel._doc,
      finalPrice: hotel.basePrice + (hotel.basePrice * markup) / 100,
      requestedCheckIn: checkIn || null,
      requestedCheckOut: checkOut || null,
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
    res.json({ message: "  Hotel deleted successfully", removed });
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
