const express = require('express');
const router = express.Router();
const { getAllAttendanceRecords, getAttendanceRecordById, createAttendanceRecord, updateAttendanceRecord, deleteAttendanceRecord } = require('../controllers/attendance.controller');

router.get('/attendance', getAllAttendanceRecords);
router.get('/attendance/:id', getAttendanceRecordById);
router.post('/attendance', createAttendanceRecord);
router.put('/attendance/:id', updateAttendanceRecord);
router.delete('/attendance/:id', deleteAttendanceRecord);

module.exports = router;