const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: String,
    size: [String],
    price: Number,
    category: String,
    quantity: Number,
    description: String,
    image: String,
},
    { timestamps: true }
);


module.exports = mongoose.model("product", productSchema);
