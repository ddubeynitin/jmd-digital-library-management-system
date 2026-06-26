const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    seatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seat',
      required: true,
    },
    slotIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TimeSlot',
        required: true,
      },
    ],
    membershipType: {
      type: String,
      enum: ['6_hour', '12_hour'],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled'],
      default: 'active',
    },
    branchId: {
      type: String,
      default: 'main',
    },
  },
  { timestamps: true },
);

bookingSchema.index({ studentId: 1, status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
