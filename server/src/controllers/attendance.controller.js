const Attendance = require('../models/attendance.model');
const Student = require('../models/student.model');
const Booking = require('../models/booking.model');
const logActivity = require('../utils/activityLogger');

const getAllAttendanceRecords = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find()
      .populate('studentId', 'name email studentId')
      .populate('bookingId');
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAttendanceRecordById = async (req, res) => {
  try {
    const attendanceRecord = await Attendance.findById(req.params.id)
      .populate('studentId', 'name email studentId')
      .populate('bookingId');
    if (!attendanceRecord) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.status(200).json(attendanceRecord);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createAttendanceRecord = async (req, res) => {
  try {
    const { studentId, bookingId, date = new Date(), checkIn = new Date() } = req.body;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking || booking.status !== 'active') {
      return res.status(403).json({ message: 'ACCESS DENIED' });
    }

    const existingToday = await Attendance.findOne({
      studentId,
      bookingId,
      date: {
        $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
        $lt: new Date(new Date(date).setHours(23, 59, 59, 999)),
      },
    });

    if (existingToday && existingToday.checkOut) {
      return res.status(400).json({ message: 'Attendance already completed for today' });
    }

    if (existingToday && !existingToday.checkOut) {
      existingToday.checkOut = new Date();
      existingToday.studyDuration = Math.max(
        0,
        Math.round((existingToday.checkOut - existingToday.checkIn) / 60000),
      );
      await existingToday.save();
      await logActivity({
        actorType: 'student',
        actorName: student.name,
        actorId: student._id,
        activityType: 'attendance_checkout',
        title: 'Check-out marked',
        description: `${student.name} checked out successfully.`,
        status: 'completed',
        metadata: { bookingId, studyDuration: existingToday.studyDuration },
      });
      return res.status(200).json(existingToday);
    }

    const attendanceRecord = await Attendance.create({
      studentId,
      bookingId,
      date,
      checkIn,
      status: 'present',
    });

    await logActivity({
      actorType: 'student',
      actorName: student.name,
      actorId: student._id,
      activityType: 'attendance_checkin',
      title: 'Check-in marked',
      description: `${student.name} checked in successfully.`,
      status: 'completed',
      metadata: { bookingId },
    });

    res.status(201).json(attendanceRecord);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAttendanceRecord = async (req, res) => {
  try {
    const { studentId, bookingId, date, checkIn, checkOut, status } = req.body;
    const attendanceRecord = await Attendance.findById(req.params.id);
    if (!attendanceRecord) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    if (studentId !== undefined) attendanceRecord.studentId = studentId;
    if (bookingId !== undefined) attendanceRecord.bookingId = bookingId;
    if (date !== undefined) attendanceRecord.date = date;
    if (checkIn !== undefined) attendanceRecord.checkIn = checkIn;
    if (checkOut !== undefined) attendanceRecord.checkOut = checkOut;
    if (status !== undefined) attendanceRecord.status = status;
    if (attendanceRecord.checkIn && attendanceRecord.checkOut) {
      attendanceRecord.studyDuration = Math.max(
        0,
        Math.round((new Date(attendanceRecord.checkOut) - new Date(attendanceRecord.checkIn)) / 60000),
      );
    }
    await attendanceRecord.save();
    res.status(200).json(attendanceRecord);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAttendanceRecord = async (req, res) => {
  try {
    const attendanceRecord = await Attendance.findById(req.params.id);
    if (!attendanceRecord) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    await attendanceRecord.deleteOne();
    res.status(200).json({ message: 'Attendance record deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllAttendanceRecords,
  getAttendanceRecordById,
  createAttendanceRecord,
  updateAttendanceRecord,
  deleteAttendanceRecord,
};
