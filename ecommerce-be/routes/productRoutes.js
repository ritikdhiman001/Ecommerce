const express = require("express");
const router = express.Router();
const ProductModal = require("../models/Products");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    format: async (req, file) => {
      // preserve extension (jpg, png)
      return path.extname(file.originalname).replace(".", "") || "jpg";
    },
    public_id: (req, file) => `prod_${Date.now()}_${Math.round(Math.random()*1e6)}`
  },
});
const upload = multer({ storage });

// Add Product
router.post("/addproduct", upload.single("image"), async (req, res) => {
  const { productName, description, price, category, quantity, size } =
    req.body;

  const image = req.file ? req.file.path : "";
  
  try {
    const newProduct = new ProductModal({
      productName,
      description,
      price,
      category,
      quantity,
      image,
      size,
    });
    await newProduct.save();
    res.send("Product added successfully");
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Failed to add product");
  }
});

// Get All Products
router.get("/allproducts", async (req, res) => {
  try {
    const products = await ProductModal.find();
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Failed to fetch products");
  }
});
router.get("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModal.findById(productId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.send(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Failed to fetch product");
  }
});

router.put("/update-product/:id", upload.single("image"), async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModal.findById(productId);
    const image = req.file ? req.file.filename : product.image;
    const Data = { ...req.body, image: image };

    if (!product) {
      res.status(404).send("Not Found");
    }
    const updatedProd = await ProductModal.findByIdAndUpdate(productId, Data);

    res.status(201).send("Update successfully");
  } catch (error) {
    res.status(500).send("Faild to update product");
  }
});

module.exports = router;
