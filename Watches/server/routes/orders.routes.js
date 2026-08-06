import { Router } from 'express';
import Order from '../models/Order.js';

const router = Router();

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/:orderId
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const {
      customerName, email, phone, address, city, zip,
      paymentMethod, items, total
    } = req.body;

    if (!customerName || !email || !phone || !address || !city || !zip) {
      return res.status(400).json({ message: 'All shipping fields are required' });
    }
    if (!paymentMethod) {
      return res.status(400).json({ message: 'Payment method is required' });
    }
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart cannot be empty' });
    }

    const orderId = 'LW' + Date.now().toString(36).toUpperCase();
    const order = await Order.create({
      orderId,
      customerName, email, phone, address, city, zip,
      paymentMethod, items, total
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
