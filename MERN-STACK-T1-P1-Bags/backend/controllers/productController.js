import Product from "../models/product.js";

// GET All Products

export const getProducts = async (req, res) => {
  try {
    console.log("Database:", Product.db.name);
    console.log("Collection:", Product.collection.name);

    const products = await Product.find();

    console.log("Products found:", products.length);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD Product

export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// UPDATE Product

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE Product

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};