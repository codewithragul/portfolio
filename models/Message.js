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
     phone: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v.toString());
        },
        message: "Phone number must be exactly 10 digits",
      },
    }, 
    subject: String,
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('Message', messageSchema);
