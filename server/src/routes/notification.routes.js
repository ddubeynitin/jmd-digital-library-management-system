const express = require('express');
const router = express.Router();
const { getNotificationsByStudent } = require('../controllers/notification.controller');

router.get('/student/:studentId', getNotificationsByStudent);

module.exports = router;
