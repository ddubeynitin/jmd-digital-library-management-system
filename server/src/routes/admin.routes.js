const express = require('express');
const router = express.Router();
const { getAdminInfo, createAdmin, broadcastMessage, getDatabaseStats } = require('../controllers/admin.controller');
const { getRecentActivities } = require('../controllers/activity.controller');

// Admin info route
router.get('/info', getAdminInfo);
router.post('/create', createAdmin);
router.post('/broadcast', broadcastMessage);
router.get('/recent-activities', getRecentActivities);
router.get('/database-stats', getDatabaseStats);

module.exports = router;
