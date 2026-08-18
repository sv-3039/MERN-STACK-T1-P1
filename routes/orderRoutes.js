import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

/**
 * @route   GET /api/orders
 * @desc    Get all orders or filter by user email
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const filter = email && email !== 'admin@mall.com' ? { userEmail: email } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve orders from database.' });
  }
});

/**
 * @route   POST /api/orders
 * @desc    Create a new order in MongoDB Atlas
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    const { orderId, userEmail, userName, shippingAddress, paymentMethod, items, subtotal, shippingFee, tax, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Order must contain at least one item.' });
    }

    const newOrder = new Order({
      orderId: orderId || `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      userEmail: userEmail || 'guest@mall.com',
      userName: userName || 'Guest Customer',
      shippingAddress: shippingAddress || 'Store Pickup',
      paymentMethod: paymentMethod || 'card',
      items,
      subtotal: subtotal || 0,
      shippingFee: shippingFee || 0,
      tax: tax || 0,
      totalAmount: totalAmount || 0,
      status: 'Pending'
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, error: 'Database save error.' });
  }
});

/**
 * @route   PATCH /api/orders/:id
 * @desc    Update order status
 * @access  Public (Admin)
 */
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: req.params.id },
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, error: 'Order not found.' });
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ success: false, error: 'Database update error.' });
  }
});

export default router;
