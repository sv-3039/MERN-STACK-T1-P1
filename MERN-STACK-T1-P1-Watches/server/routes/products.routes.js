import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();

// GET /api/products?category=men&brand=Rolex
router.get('/', async (req, res) => {
  try {
    const { category, brand } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    const products = await Product.find(filter).sort({ id: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: Number(req.params.id) });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products  (create/single product)
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: Number(req.params.id) });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
