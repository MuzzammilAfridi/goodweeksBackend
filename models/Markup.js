const mongoose = require("mongoose");

const MarkupSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    markup: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Markup = mongoose.model("Markup", MarkupSchema);

module.exports = Markup;
