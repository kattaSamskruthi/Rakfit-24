const mongoose = require("mongoose");
const Post = require('../models/post')

const PostSchema = new mongoose.Schema({
    caption: {
      type: String,
      required: true,
    },
    productLink: {
      type: String,
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
const wishListSchema = new mongoose.Schema({
    wishListId: { type: String, required: true, unique: true },
    items: [PostSchema]
});

module.exports = mongoose.model("WishList", wishListSchema);