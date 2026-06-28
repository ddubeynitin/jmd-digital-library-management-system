const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/student.model');
const Seat = require('../models/seat.model');
const Booking = require('../models/booking.model');
const TimeSlot = require('../models/timeSlot.model');
const logActivity = require('../utils/activityLogger');
const { sendBrevoEmail } = require('../services/email.service');
const { uploadToCloudinary, hasCloudinaryConfig } = require('../config/cloudinary');

const OTP_EXPIRY_MINUTES = 10;
const OTP_PURPOSE_LOGIN = 'login';
const OTP_PURPOSE_RESET = 'reset_password';

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

const normalizeIdentifier = (value = '') => String(value).trim().toLowerCase();

const findStudentByIdentifier = async (identifier) => {
  const trimmed = String(identifier || '').trim();
  if (!trimmed) {
    return null;
  }

  return User.findOne({
    $or: [
      { email: normalizeIdentifier(trimmed) },
      { studentId: trimmed },
    ],
  });
};

const generateOtp = () => String(crypto.randomInt(100000, 1000000));

const uploadProfilePicture = async (profilePicture) => {
  if (!profilePicture) {
    return null;
  }

  if (typeof profilePicture === 'string' && profilePicture.startsWith('http')) {
    return profilePicture;
  }

  if (!hasCloudinaryConfig()) {
    throw new Error('Cloudinary configuration is missing');
  }

  const fileData =
    typeof profilePicture === 'string'
      ? profilePicture
      : profilePicture?.dataUrl || profilePicture?.fileData || null;

  if (!fileData) {
    return null;
  }

  const uploadResult = await uploadToCloudinary(fileData, {
    folder: 'jmd-digital-library/students',
  });

  return uploadResult?.secure_url || uploadResult?.url || null;
};

const sendOtpToStudent = async (student, purpose) => {
  const otp = generateOtp();
  student.authOtp = {
    codeHash: await bcrypt.hash(otp, 10),
    purpose,
    expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
    sentTo: student.email,
  };
  await student.save();

  const purposeLabel = purpose === OTP_PURPOSE_RESET ? 'password reset' : 'login';
  const result = await sendBrevoEmail({
    to: { email: student.email, name: student.name },
    subject: `Your JMD Library ${purposeLabel} OTP`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2>Your OTP is ${otp}</h2>
        <p>Hello ${student.name},</p>
        <p>Use this code to complete your ${purposeLabel} request.</p>
        <p>This OTP expires in ${OTP_EXPIRY_MINUTES} minutes.</p>
      </div>
    `,
    text: `Your OTP is ${otp}. It expires in ${OTP_EXPIRY_MINUTES} minutes.`,
  });

  if (result?.skipped) {
    throw new Error('Email service is not configured');
  }

  return otp;
};

const clearStudentOtp = async (student) => {
  student.authOtp = {
    codeHash: null,
    purpose: null,
    expiresAt: null,
    sentTo: null,
  };
  await student.save();
};

const verifyStudentOtp = async (student, otp, purpose) => {
  const storedOtp = student?.authOtp;

  if (
    !storedOtp?.codeHash ||
    storedOtp.purpose !== purpose ||
    !storedOtp.expiresAt ||
    storedOtp.expiresAt.getTime() < Date.now()
  ) {
    return false;
  }

  return bcrypt.compare(String(otp || ''), storedOtp.codeHash);
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
      profilePicture,
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

    const profilePictureUrl = await uploadProfilePicture(profilePicture);

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
      profilePicture: profilePictureUrl,
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

    newUser.bookingId = booking._id;
    newUser.branchId = seat.branchId || 'main';
    await newUser.save();

    try {
      await sendBrevoEmail({
        to: { email, name: fullName },
        subject: 'Your Study Center enrollment details',
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
            <h2>Your registration is complete</h2>
            <p>Hello ${fullName},</p>
            <p>Your enrollment details are below:</p>
            <ul>
              <li><strong>Enrollment No:</strong> ${studentId}</li>
              <li><strong>Temporary Password:</strong> ${password}</li>
              <li><strong>Seat Number:</strong> ${seat.seatNumber}</li>
              <li><strong>Branch:</strong> ${seat.branchId || 'main'}</li>
              <li><strong>Membership:</strong> ${membershipType === '12_hour' ? '12 Hour Membership' : '6 Hour Membership'}</li>
            </ul>
            <p>Please sign in and change your password after first login.</p>
          </div>
        `,
        text: `Your enrollment no: ${studentId}\nTemporary password: ${password}\nSeat: ${seat.seatNumber}`,
      });
    } catch (mailError) {
      console.error('Brevo email send failed:', mailError.message);
    }

    res.status(201).json({
      message: 'Student registered successfully',
      data: {
        studentId,
        password,
        bookingId: booking._id,
        profilePicture: profilePictureUrl,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.message || 'Server error',
      code: error.code || undefined,
    });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, email, studentId, password } = req.body;
    const userIdentifier = identifier || email || studentId;
    const user = await findStudentByIdentifier(userIdentifier);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    await clearStudentOtp(user);

    await logActivity({
      actorType: user.role === 'admin' ? 'admin' : 'student',
      actorName: user.name,
      actorId: user._id,
      activityType: 'login',
      title: `${user.role === 'admin' ? 'Admin' : 'Student'} login`,
      description: `${user.name} logged in successfully.`,
      status: 'completed',
      metadata: { email: user.email, studentId: user.studentId },
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        studentId: user.studentId,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const requestLoginOtp = async (req, res) => {
  try {
    const { identifier, email, studentId } = req.body;
    const user = await findStudentByIdentifier(identifier || email || studentId);

    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await sendOtpToStudent(user, OTP_PURPOSE_LOGIN);

    res.status(200).json({
      message: 'Login OTP sent to your registered email address',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Server error',
      code: error.code || undefined,
    });
  }
};

const verifyLoginOtp = async (req, res) => {
  try {
    const { identifier, email, studentId, otp } = req.body;
    const user = await findStudentByIdentifier(identifier || email || studentId);

    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const isValid = await verifyStudentOtp(user, otp, OTP_PURPOSE_LOGIN);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    await clearStudentOtp(user);

    await logActivity({
      actorType: user.role === 'admin' ? 'admin' : 'student',
      actorName: user.name,
      actorId: user._id,
      activityType: 'login',
      title: `${user.role === 'admin' ? 'Admin' : 'Student'} login`,
      description: `${user.name} logged in with OTP.`,
      status: 'completed',
      metadata: { email: user.email, studentId: user.studentId, loginMethod: 'otp' },
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        studentId: user.studentId,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Server error',
      code: error.code || undefined,
    });
  }
};

const requestPasswordResetOtp = async (req, res) => {
  try {
    const { identifier, email, studentId } = req.body;
    const user = await findStudentByIdentifier(identifier || email || studentId);

    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await sendOtpToStudent(user, OTP_PURPOSE_RESET);

    res.status(200).json({
      message: 'Password reset OTP sent to your registered email address',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Server error',
      code: error.code || undefined,
    });
  }
};

const resetPasswordWithOtp = async (req, res) => {
  try {
    const { identifier, email, studentId, otp, newPassword } = req.body;
    const user = await findStudentByIdentifier(identifier || email || studentId);

    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (!newPassword || String(newPassword).trim().length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const isValid = await verifyStudentOtp(user, otp, OTP_PURPOSE_RESET);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.password = newPassword;
    await user.save();
    await clearStudentOtp(user);

    await logActivity({
      actorType: 'student',
      actorName: user.name,
      actorId: user._id,
      activityType: 'password_reset',
      title: 'Password reset',
      description: `${user.name} reset their password using OTP.`,
      status: 'completed',
      metadata: { email: user.email, studentId: user.studentId },
    });

    res.status(200).json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Server error',
      code: error.code || undefined,
    });
  }
};

module.exports = {
    register,
    login,
    requestLoginOtp,
    verifyLoginOtp,
    requestPasswordResetOtp,
    resetPasswordWithOtp,
};
