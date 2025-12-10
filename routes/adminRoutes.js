const express = require("express");
const {
  addMarkup,
  getMarkups,
  deleteMarkup,
  updateMarkup
} = require("../controllers/markupController.js");


const router = express.Router();

router.post("/markup", addMarkup);
router.get("/markup", getMarkups);
router.put("/markup/:city", updateMarkup);
router.delete("/markup/:city", deleteMarkup);

module.exports = router;
