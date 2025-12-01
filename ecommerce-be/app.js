const express = require("express");
const mongo = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

const dbUrl = process.env.MONGODB_URI;

// Connect to DB
mongo.connect(dbUrl)
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Database not connected:", err));

// Root test route
app.get("/", (req, res) => {
  res.send("API working from Vercel!");
});

// Routes
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", categoryRoutes);

// Local mode (npm start)
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

module.exports = app;
