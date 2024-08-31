const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: false,
  },
  image: {
    type: String, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
























