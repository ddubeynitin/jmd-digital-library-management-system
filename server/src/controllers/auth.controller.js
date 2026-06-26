const jwt = require('jsonwebtoken');
const User = require('../models/student.model');
const Seat = require('../models/seat.model');
const Booking = require('../models/booking.model');
const TimeSlot = require('../models/timeSlot.model');
const logActivity = require('../utils/activityLogger');

const generateStudentId = async () => {
  const digits = '0123456789';
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const id = Array.from({ length: 8 }, () => digits[Math.floor(Math.random() * digits.length)]).join('');
    const existing = await User.findOne({ studentId: id });
    if (!existing) {
      return id;
    }
  }
  throw new Error('Unable to generate unique student ID');
};

const generatePassword = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};

const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      gender,
      studentClass,
      branchId = 'main',
      duration,
      seatNumber,
      address,
      city,
      state,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !gender ||
      !studentClass ||
      !duration ||
      !seatNumber
    ) {
      return res.status(400).json({ message: 'Missing required registration fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const studentId = await generateStudentId();
    const password = generatePassword();

    const seat = await Seat.findOne({ branchId, seatNumber });
    if (!seat) {
      return res.status(400).json({
        message: 'Selected seat is not available for the chosen branch',
      });
    }

    if (seat.status === 'reserved') {
      return res.status(400).json({ message: 'Selected seat is already reserved' });
    }

    if (seat.active === false || seat.status === 'inactive') {
      return res.status(400).json({ message: 'Selected seat is inactive' });
    }

    const newUser = new User({
      name: fullName,
      email,
      password,
      studentId,
      phone,
      gender,
      studentClass,
      branchId,
      duration,
      seatNumber,
      address,
      city,
      state,
    });

    await newUser.save();

    const membershipType = String(duration).includes('12') ? '12_hour' : '6_hour';
    const availableSlots = await TimeSlot.find({ isActive: true, branchId: seat.branchId || 'main' }).sort({ createdAt: 1 });
    const selectedSlotIds =
      membershipType === '12_hour'
        ? availableSlots.slice(0, 2).map((slot) => slot._id)
        : availableSlots.slice(0, 1).map((slot) => slot._id);

    await logActivity({
      actorType: 'student',
      actorName: newUser.name,
      actorId: newUser._id,
      activityType: 'register',
      title: 'New registration',
      description: `${newUser.name} registered and requested seat ${seatNumber}.`,
      status: 'completed',
      metadata: {
        studentId: newUser.studentId,
        seatNumber,
        branchId,
      },
    });

    const booking = await Booking.create({
      studentId: newUser._id,
      seatId: seat._id,
      slotIds: selectedSlotIds,
      membershipType,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'active',
      branchId: seat.branchId || 'main',
    });

    seat.bookingId = booking._id;
    seat.slotIds = selectedSlotIds;
    seat.status = 'reserved';
    seat.reservedBy = newUser._id;
    seat.reservedAt = new Date();
    await seat.save();

    res.status(201).json({
      message: 'Student registered successfully',
      data: {
        studentId,
        password,
        bookingId: booking._id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check password        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });    
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        await logActivity({
          actorType: user.role === 'admin' ? 'admin' : 'student',
          actorName: user.name,
          actorId: user._id,
          activityType: 'login',
          title: `${user.role === 'admin' ? 'Admin' : 'Student'} login`,
          description: `${user.name} logged in successfully.`,
          status: 'completed',
          metadata: { email: user.email },
        });
        res.status(200).json({ message: 'Login successful', token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}    

module.exports = {
    register,
    login,
};
