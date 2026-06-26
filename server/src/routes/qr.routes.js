const express = require('express');
const router = express.Router();
const { generateStudentQr } = require('../controllers/qr.controller');

router.get('/student/:studentId', generateStudentQr);

module.exports = router;
