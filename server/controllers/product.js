const Product = require("../models/product");

const productRouter = require("express").Router();
const { storage } = require('../storage/storage');
const multer = require('multer');
const upload = multer({ storage });

productRouter.post("/create-product",upload.single('image'), async (req, res) => {
  try {
    console.log("here");
    const { caption, productPrice} = req.body;
    const imageUrl = req.file.path;

   console.log(imageUrl)

    // Create new product
    const newProduct = new Product({
      caption,
      productPrice,
      image:imageUrl, // Store Cloudinary image URL
    });

    // Save product to MongoDB
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

productRouter.get('/get-products', async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  productRouter.get('/get-product-by-id/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = productRouter;














