const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/student.model');
const Attendance = require('../models/attendance.model');

const getAllAttendanceRecords = async (req, res) => {
    try{
        const attendanceRecords = await Attendance.find().populate('student');
        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const getAttendanceRecordById = async (req, res) => {
    try{
        const attendanceRecord = await Attendance.findById(req.params.id).populate('student');
        if (!attendanceRecord) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json(attendanceRecord);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const createAttendanceRecord = async (req, res) => {
    try{
        const { studentId, date, status } = req.body;
        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const attendanceRecord = new Attendance({
            student: studentId,
            date,
            status
        });
        await attendanceRecord.save();
        res.status(201).json(attendanceRecord);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const updateAttendanceRecord = async (req, res) => {
    try{
        const { studentId, date, status } = req.body;
        const attendanceRecord = await Attendance.findById(req.params.id);
        if (!attendanceRecord) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        attendanceRecord.student = studentId;
        attendanceRecord.date = date;
        attendanceRecord.status = status;
        await attendanceRecord.save();
        res.status(200).json(attendanceRecord);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteAttendanceRecord = async (req, res) => {
    try{
        const attendanceRecord = await Attendance.findById(req.params.id);
        if (!attendanceRecord) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        await attendanceRecord.remove();
        res.status(200).json({ message: 'Attendance record deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getAllAttendanceRecords,
    getAttendanceRecordById,
    createAttendanceRecord,
    updateAttendanceRecord,
    deleteAttendanceRecord
};