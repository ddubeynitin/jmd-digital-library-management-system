const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      default: null,
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ['cash', 'upi', 'card', 'pending'],
      default: 'pending',
    },
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
    receiptNumber: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Payment', paymentSchema);
