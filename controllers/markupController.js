const Markup = require("../models/Markup.js");

// ✅ ADD MARKUP
const addMarkup = async (req, res) => {
  try {
    const { city, markup } = req.body;

    const newMarkup = new Markup({ city, markup });
    await newMarkup.save();

    res.json({ message: "Markup added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET ALL MARKUPS
const getMarkups = async (req, res) => {
  try {
    const data = await Markup.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ UPDATE MARKUP
 const updateMarkup = async (req, res) => {
  try {
    const { city } = req.params;
    const { markup } = req.body;

    const updated = await Markup.findOneAndUpdate(
      { city },
      { markup },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "City not found" });
    }

    res.json({
      message: "✅ Markup updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// ✅ DELETE MARKUP
const deleteMarkup = async (req, res) => {
  try {
    await Markup.deleteOne({ city: req.params.city });
    res.json({ message: "Markup deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addMarkup,
  getMarkups,
    updateMarkup,   
  deleteMarkup,
};
