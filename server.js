// server.js - Static portfolio + MongoDB API
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// =====================
// MongoDB Connection
// =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB connection failed', err);
    process.exit(1);
  });

// =====================
// Message Schema
// =====================
const messageSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true },
  phone: String,
  subject: String,
  message: { type: String, required: true },
  receivedAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// =====================
// Static Folder
// =====================
const PUBLIC_DIR = path.join(__dirname, 'public');
app.use(express.static(PUBLIC_DIR));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

// =====================
// API Routes
// =====================

// Save message
app.post('/api/messages', async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields: fullName, email, message'
      });
    }

    await Message.create({ fullName, email, phone, subject, message });
    console.log('📩 Message saved from:', email);

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('❌ Failed to save message:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin: get all messages (optional)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ receivedAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Health check
app.get('/_status', (req, res) => {
  res.json({ ok: true });
});

// =====================
// Server
// =====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
