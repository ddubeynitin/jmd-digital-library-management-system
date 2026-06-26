const TimeSlot = require('../models/timeSlot.model');

const getSlots = async (req, res) => {
  try {
    const slots = await TimeSlot.find().sort({ createdAt: 1 });
    res.json({ message: 'Slots fetched successfully', data: slots });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createSlot = async (req, res) => {
  try {
    const { slotName, startTime, endTime, branchId = 'main' } = req.body;
    if (!slotName || !startTime || !endTime) {
      return res.status(400).json({ message: 'slotName, startTime, and endTime are required' });
    }
    const slot = await TimeSlot.create({ slotName, startTime, endTime, branchId });
    res.status(201).json({ message: 'Slot created successfully', data: slot });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getSlots, createSlot };
