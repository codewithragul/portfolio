const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const Message = require('./models/Message');

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===== MONGODB ===== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

/* ===== API ROUTE ===== */
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    const newMessage = new Message({
      fullName,
      email,
      phone,
      subject,
      message
    });

    await newMessage.save();

    res.status(201).json({ success: true, message: 'Message saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/* ===== STATIC FRONTEND ===== */
app.use(express.static(path.join(__dirname, 'public')));

/* ===== FALLBACK ===== */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* ===== PORT ===== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
