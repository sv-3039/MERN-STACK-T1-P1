const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    brand: String,
    price: Number,
    category: String,
    rating: Number,
    reviews: Number,
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);