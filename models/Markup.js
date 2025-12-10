import mongoose from "mongoose";

const MarkupSchema = new mongoose.Schema({
  city: { 
    type: String,
    required: true,
    unique: true, 
    index: true
 },
  markup: { 
    type: Number,
     required: true
     } 
}, { timestamps: true });

const Markup = mongoose.model("Markup", MarkupSchema);
export default Markup;
