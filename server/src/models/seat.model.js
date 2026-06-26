const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema(
  {
    branchId: {
      type: String,
      required: true,
      trim: true,
    },
    seatNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'reserved', 'inactive'],
      default: 'available',
    },
    active: {
      type: Boolean,
      default: true,
    },
    reservedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      default: null,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      default: null,
    },
    slotIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TimeSlot',
      },
    ],
    reservedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

seatSchema.index({ branchId: 1, seatNumber: 1 }, { unique: true });

module.exports = mongoose.model('Seat', seatSchema);
