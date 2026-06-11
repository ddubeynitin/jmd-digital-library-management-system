const express = require('express');
const router = express.Router();
const { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/student.controller');

router.get('/student', getAllStudents);
router.get('/student/:id', getStudentById);
router.post('/student', createStudent);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);

module.exports = router;