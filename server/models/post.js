// models/post.js
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  productLink: {
    type: String,
    required: false,
  },
  trendTags: {
    type: [String],  // Array of strings for trendTags
    required: false,
  },
  image: {
    type: String,  // Assuming the image is stored as a URL or path
    required: true,
  },
  user: {
    name: {
      type: String,
      required: true,
    },
    initials: {
      type: String,  // Changed from image to initials to match your frontend
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);