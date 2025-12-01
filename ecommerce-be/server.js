const express = require("express");
const mongo = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes")

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

const dbUrl = process.env.MONGODB_URI

// MongoDB connection
mongo.connect(dbUrl)
    .then(() => console.log("Database connected"))
    .catch(() => console.log("Database not connected"));

// Use routes
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", categoryRoutes)

// Start server
app.listen(3000, () => console.log("Server is Started"));
