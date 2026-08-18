import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { ALL_STORE_PRODUCTS } from './server/data/productsSeed.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize MongoDB Connection (handles missing URI or errors gracefully inside connectDB)
connectDB();

// In-Memory Fallback State (Ensures instant out-of-the-box working API without DB)
let memoryProducts = [...ALL_STORE_PRODUCTS];
let memoryOrders = [
  {
    orderId: 'ORD-882194',
    userEmail: 'alex@example.com',
    userName: 'Alex Johnson',
    items: [{ name: 'Urban Explorer Backpack', price: 1499, quantity: 1, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80' }],
    shippingAddress: '123 Park Avenue, New York - 10001',
    paymentMethod: 'card',
    subtotal: 1499,
    shippingFee: 0,
    tax: 75,
    totalAmount: 1574,
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Express Server Active',
    mongodb: process.env.MONGODB_URI ? 'Connected / Configured' : 'In-Memory Mode'
  });
});

// Primary Modular Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Auth Login Route
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  const role = email && String(email).toLowerCase().includes('admin') ? 'admin' : 'user';

  res.json({
    success: true,
    token: `jwt_token_${Date.now()}`,
    user: {
      id: `usr_${Date.now()}`,
      name: email ? email.split('@')[0] : 'Member',
      email: email || 'user@mall.com',
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email || 'user'}`
    }
  });
});

// ---------------------------
// VITE MIDDLEWARE / STATIC FILES
// ---------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Mall Express Multi-Store Backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
