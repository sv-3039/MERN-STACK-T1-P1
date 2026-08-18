const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: String,
    phone: String,
    address: String,

    items: [
      {
        name: String,
        quantity: Number,
        price: Number,
      },
    ],

    total: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);