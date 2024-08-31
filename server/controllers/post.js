

const Post = require("../models/post");

const postRouter = require("express").Router();
const { storage } = require('../storage/storage');
const multer = require('multer');
const upload = multer({ storage });

postRouter.post("/create-post",upload.single('image'), async (req, res) => {
  try {
    console.log("here");
    console.log(req.body);
    const { caption, productLink } = req.body;
    const trendTags = req.body.trendTags instanceof Array ? req.body.trendTags : [req.body.trendTags]; // Ensure trendTags is always an array
    const user = JSON.parse(req.body.user);
    const imageUrl = req.file.path;

  //  console.log(imageUrl)
   console.log("Parsed data:", { caption, productLink, trendTags, user, imageUrl });
    // Create new post
    const newPost = new Post({
      caption,
      productLink,
      trendTags,
      user,
      image:imageUrl, // Store Cloudinary image URL
    });

    // Save post to MongoDB
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

postRouter.get('/get-posts', async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  postRouter.get('/get-post-by-id/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports =postRouter;














