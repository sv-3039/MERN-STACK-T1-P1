import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products or filter by category/search
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve products.' });
  }
});

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Public (Admin)
 */
router.post('/', async (req, res) => {
  try {
    const { name, category, price, stock, image, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ success: false, error: 'Product name and price are required.' });
    }

    const newProduct = new Product({
      id: `prod_${Date.now()}`,
      name,
      category: category || 'General',
      price: Number(price),
      stock: Number(stock || 10),
      image: image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
      description: description || ''
    });

    const saved = await newProduct.save();
    res.status(201).json({ success: true, product: saved });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ success: false, error: 'Failed to save product.' });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product
 * @access  Public (Admin)
 */
router.delete('/:id', async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.params.id });
    res.status(200).json({ success: true, message: `Product ${req.params.id} deleted.` });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete product.' });
  }
});

export default router;
