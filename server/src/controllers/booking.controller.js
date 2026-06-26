const Booking = require('../models/booking.model');
const Seat = require('../models/seat.model');
const Student = require('../models/student.model');
const TimeSlot = require('../models/timeSlot.model');
const Payment = require('../models/payment.model');
const Notification = require('../models/notification.model');
const logActivity = require('../utils/activityLogger');

const createBooking = async (req, res) => {
  try {
    const { studentId, seatId, slotIds = [], membershipType, startDate, endDate, amount, method = 'pending' } = req.body;
    if (!studentId || !seatId || !membershipType || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required booking fields' });
    }

    const student = await Student.findById(studentId);
    const seat = await Seat.findById(seatId);
    const slots = await TimeSlot.find({ _id: { $in: slotIds } });
    if (!student || !seat) return res.status(404).json({ message: 'Student or seat not found' });
    if (membershipType === '6_hour' && slotIds.length !== 1) {
      return res.status(400).json({ message: '6 hour membership requires exactly one slot' });
    }
    if (membershipType === '12_hour' && slotIds.length !== 2) {
      return res.status(400).json({ message: '12 hour membership requires both slots' });
    }
    if (slots.length !== slotIds.length) {
      return res.status(400).json({ message: 'One or more selected slots are invalid' });
    }
    if (seat.status !== 'available') {
      return res.status(400).json({ message: 'Seat is not available' });
    }

    const booking = await Booking.create({
      studentId,
      seatId,
      slotIds,
      membershipType,
      startDate,
      endDate,
      branchId: seat.branchId,
      status: 'active',
    });

    seat.status = 'reserved';
    seat.bookingId = booking._id;
    seat.slotIds = slotIds;
    seat.reservedBy = student._id;
    seat.reservedAt = new Date();
    await seat.save();

    if (amount !== undefined) {
      const payment = await Payment.create({
        studentId,
        bookingId: booking._id,
        amount,
        method,
        status: method === 'pending' ? 'pending' : 'paid',
        receiptNumber: `RCPT-${Date.now()}`,
      });

      await Notification.create({
        studentId,
        title: 'Admission approved',
        message: 'Your booking has been created successfully.',
        type: 'admission_approved',
        metadata: { bookingId: booking._id, paymentId: payment._id },
      });
    }

    await logActivity({
      actorType: 'admin',
      actorName: 'System Admin',
      activityType: 'booking_created',
      title: 'Booking created',
      description: `Booking created for ${student.name} on seat ${seat.seatNumber}.`,
      status: 'completed',
      metadata: { bookingId: booking._id, studentId, seatId, membershipType, slotIds },
    });

    const io = req.app.get('io');
    io?.emit('seat-updated', { seatId: seat._id, status: seat.status, bookingId: booking._id });
    io?.emit('activity-created', { type: 'booking_created', bookingId: booking._id });

    res.status(201).json({ message: 'Booking created successfully', data: booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('studentId', 'name email studentId')
      .populate('seatId')
      .populate('slotIds');
    res.json({ message: 'Bookings fetched successfully', data: bookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createBooking, getBookings };
