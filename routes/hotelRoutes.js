const express = require("express");
const { addHotel, searchHotels, getAllHotels, deleteHotel } = require("../controllers/hotelController.js");

const router = express.Router();

router.post("/add", addHotel);
router.post("/search", searchHotels);
router.get("/all", getAllHotels);       
router.delete("/:id", deleteHotel); 

module.exports = router;
