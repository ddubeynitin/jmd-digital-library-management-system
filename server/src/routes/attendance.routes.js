const express = require('express');
const router = express.Router();
const { getAllAttendanceRecords, getAttendanceRecordById, getAttendanceByStudent, createAttendanceRecord, updateAttendanceRecord, deleteAttendanceRecord } = require('../controllers/attendance.controller');

router.get('/attendance', getAllAttendanceRecords);
router.get('/attendance/student/:studentId', getAttendanceByStudent);
router.get('/attendance/:id', getAttendanceRecordById);
router.post('/attendance', createAttendanceRecord);
router.put('/attendance/:id', updateAttendanceRecord);
router.delete('/attendance/:id', deleteAttendanceRecord);

module.exports = router;
