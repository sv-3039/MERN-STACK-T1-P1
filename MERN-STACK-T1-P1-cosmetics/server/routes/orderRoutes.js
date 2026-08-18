const express = require("express");

const router = express.Router();

const Order = require("../models/Order");

router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);

    await order.save();

    res.status(201).json({
      message: "Order Saved Successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;