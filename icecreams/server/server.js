import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { readDB, writeDB } from './db.js';
import { Product } from './models/Product.js';
import { Combo } from './models/Combo.js';
import { Order } from './models/Order.js';
import { products as defaultProducts, combos as defaultCombos } from '../src/data/products.js';
import { sendAutomatedWhatsAppOrderToken } from './services/whatsapp.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

let isMongoConnected = false;

// Connect to MongoDB Atlas if URI is provided
if (MONGODB_URI && MONGODB_URI.trim() !== '') {
  mongoose
    .connect(MONGODB_URI)
    .then(async () => {
      isMongoConnected = true;
      console.log('✅ Connected to MongoDB Atlas Cloud Database successfully!');

      // Seed Mongo if empty
      const pCount = await Product.countDocuments();
      if (pCount === 0) {
        console.log('Seeding MongoDB Atlas with default products...');
        const uniqueProds = [];
        const seenIds = new Set();
        for (const p of defaultProducts) {
          if (!seenIds.has(p.id)) {
            seenIds.add(p.id);
            uniqueProds.push(p);
          }
        }
        await Product.insertMany(uniqueProds);
      }

      const cCount = await Combo.countDocuments();
      if (cCount === 0) {
        console.log('Seeding MongoDB Atlas with default combos...');
        const uniqueCombos = [];
        const seenCombos = new Set();
        for (const c of defaultCombos) {
          if (!seenCombos.has(c.id)) {
            seenCombos.add(c.id);
            uniqueCombos.push(c);
          }
        }
        await Combo.insertMany(uniqueCombos);
      }
    })
    .catch((err) => {
      console.warn('⚠️ MongoDB Atlas Connection Failed. Falling back to local file database:', err.message);
      isMongoConnected = false;
    });
} else {
  console.log('ℹ️ MONGODB_URI not set in .env. Running on local persistent file database.');
}

// Seed local JSON database on startup
function initLocalDatabase() {
  const db = readDB();
  if (!db.products || db.products.length === 0) {
    db.products = defaultProducts;
  }
  if (!db.combos || db.combos.length === 0) {
    db.combos = defaultCombos;
  }
  db.orders = db.orders || [];
  writeDB(db);
}
initLocalDatabase();

// --- API ROUTES ---

// Health & Status Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: isMongoConnected ? 'MongoDB Atlas' : 'Local JSON DB',
    timestamp: new Date().toISOString(),
  });
});

// Admin Auth Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    return res.json({
      success: true,
      token: 'admin-secret-jwt-token-scoopco',
      user: { name: 'Store Administrator', role: 'admin' },
    });
  }
  return res.status(401).json({ success: false, message: 'Invalid Admin Credentials' });
});

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    if (isMongoConnected) {
      const mongoProds = await Product.find({}).lean();
      return res.json(mongoProds);
    }
    const db = readDB();
    res.json(db.products || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const prod = await Product.findOne({ id }).lean();
      if (!prod) return res.status(404).json({ message: 'Product not found' });
      return res.json(prod);
    }
    const db = readDB();
    const prod = (db.products || []).find((p) => String(p.id) === String(id));
    if (!prod) return res.status(404).json({ message: 'Product not found' });
    res.json(prod);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add product
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = req.body;
    if (!newProduct.name || !newProduct.price) {
      return res.status(400).json({ success: false, message: 'Name and price are required' });
    }

    const prodData = {
      ...newProduct,
      id: newProduct.id || `prod-${Date.now()}`,
    };

    if (isMongoConnected) {
      const created = await Product.create(prodData);
      return res.status(201).json({ success: true, product: created });
    }

    const db = readDB();
    db.products = [prodData, ...(db.products || []).filter((p) => p.id !== prodData.id)];
    writeDB(db);
    res.status(201).json({ success: true, product: prodData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update product
app.get('/api/products/:id', async (req, res) => {
  // handled above
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isMongoConnected) {
      const updated = await Product.findOneAndUpdate({ id }, updateData, { new: true }).lean();
      return res.json({ success: true, product: updated });
    }

    const db = readDB();
    db.products = (db.products || []).map((p) =>
      String(p.id) === String(id) ? { ...p, ...updateData } : p
    );
    writeDB(db);
    res.json({ success: true, product: updateData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      await Product.deleteOne({ id });
      return res.json({ success: true });
    }

    const db = readDB();
    db.products = (db.products || []).filter((p) => String(p.id) !== String(id));
    writeDB(db);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET all combos
app.get('/api/combos', async (req, res) => {
  try {
    if (isMongoConnected) {
      const mongoCombos = await Combo.find({}).lean();
      return res.json(mongoCombos);
    }
    const db = readDB();
    res.json(db.combos || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add combo
app.post('/api/combos', async (req, res) => {
  try {
    const newCombo = req.body;
    const comboData = {
      ...newCombo,
      id: newCombo.id || `combo-${Date.now()}`,
    };

    if (isMongoConnected) {
      const created = await Combo.create(comboData);
      return res.status(201).json({ success: true, combo: created });
    }

    const db = readDB();
    db.combos = [comboData, ...(db.combos || []).filter((c) => c.id !== comboData.id)];
    writeDB(db);
    res.status(201).json({ success: true, combo: comboData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update combo
app.put('/api/combos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isMongoConnected) {
      const updated = await Combo.findOneAndUpdate({ id }, updateData, { new: true }).lean();
      return res.json({ success: true, combo: updated });
    }

    const db = readDB();
    db.combos = (db.combos || []).map((c) =>
      String(c.id) === String(id) ? { ...c, ...updateData } : c
    );
    writeDB(db);
    res.json({ success: true, combo: updateData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE combo
app.delete('/api/combos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      await Combo.deleteOne({ id });
      return res.json({ success: true });
    }

    const db = readDB();
    db.combos = (db.combos || []).filter((c) => String(c.id) !== String(id));
    writeDB(db);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET all orders
app.get('/api/orders', async (req, res) => {
  try {
    if (isMongoConnected) {
      const mongoOrders = await Order.find({}).sort({ createdAt: -1 }).lean();
      return res.json(mongoOrders);
    }
    const db = readDB();
    res.json(db.orders || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new counter order
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      orderId: req.body.orderId || `ORD-${Date.now()}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    // Trigger direct automated backend WhatsApp token dispatch
    const whatsappResult = await sendAutomatedWhatsAppOrderToken(orderData);
    orderData.whatsappSent = whatsappResult.success;
    orderData.whatsappStatus = whatsappResult.mode || 'SENT';

    if (isMongoConnected) {
      const created = await Order.create(orderData);
      return res.status(201).json({ success: true, order: created, whatsapp: whatsappResult });
    }

    const db = readDB();
    db.orders = [orderData, ...(db.orders || [])];
    writeDB(db);
    res.status(201).json({ success: true, order: orderData, whatsapp: whatsappResult });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST seed / reset
app.post('/api/seed', async (req, res) => {
  try {
    if (isMongoConnected) {
      await Product.deleteMany({});
      await Combo.deleteMany({});
      await Product.insertMany(defaultProducts);
      await Combo.insertMany(defaultCombos);
      console.log('MongoDB Atlas re-seeded successfully!');
    }

    const db = readDB();
    db.products = defaultProducts;
    db.combos = defaultCombos;
    db.orders = [];
    writeDB(db);

    res.json({ success: true, message: 'Database re-seeded successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Razorpay Endpoint: Create Order
app.post('/api/create-razorpay-order', async (req, res) => {
  try {
    const { amount, receipt } = req.body;
    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_TNljATqMmXJupa';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'tBogfpHfUMgrgT35YjteLDG5';

    const amountInPaise = Math.round(Number(amount) * 100);
    const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt: receipt || `rcpt_${Date.now()}`,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Razorpay Order Error:', data);
      return res.status(400).json({ success: false, error: data.error?.description || 'Razorpay order creation failed' });
    }

    res.json({
      success: true,
      order: data,
      keyId: keyId,
    });
  } catch (err) {
    console.error('Create Razorpay Order Server Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Razorpay Endpoint: Verify Signature
app.post('/api/verify-razorpay-signature', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'tBogfpHfUMgrgT35YjteLDG5';

    const hmac = crypto.createHmac('sha256', keySecret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
      res.json({ success: true, verified: true });
    } else {
      res.status(400).json({ success: false, verified: false, error: 'Invalid Razorpay Signature' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Scoop & Co. Backend Server running on http://localhost:${PORT}`);
});
