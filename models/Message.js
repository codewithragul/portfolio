const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    subject: String,
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // 👈 adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model('Message', messageSchema);
