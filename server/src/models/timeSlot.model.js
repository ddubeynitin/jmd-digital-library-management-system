const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema(
  {
    slotName: {
      type: String,
      required: true,
      trim: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    branchId: {
      type: String,
      default: 'main',
      trim: true,
    },
  },
  { timestamps: true },
);

timeSlotSchema.index({ branchId: 1, slotName: 1 }, { unique: true });

module.exports = mongoose.model('TimeSlot', timeSlotSchema);
