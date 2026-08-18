import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import productsRoutes from './routes/products.routes.js';
import ordersRoutes from './routes/orders.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/watches';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'LuxeWatch API is running', status: 'ok' });
});

// Guide for other methods on root
app.all('/', (req, res) => {
  res.status(200).json({
    message: 'LuxeWatch API is running',
    status: 'ok',
    tip: `You sent a ${req.method} request to /. Use these endpoints instead:`,
    endpoints: {
      listProducts: 'GET /api/products',
      filterProducts: 'GET /api/products?category=men&brand=Rolex',
      getProduct: 'GET /api/products/:id',
      createProduct: 'POST /api/products',
      createOrder: 'POST /api/orders',
      listOrders: 'GET /api/orders'
    }
  });
});

// Connect to MongoDB and start server
const start = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB connected: ${MONGODB_URI}`);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

start();
