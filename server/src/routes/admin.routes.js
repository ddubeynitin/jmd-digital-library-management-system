const express = require('express');
const router = express.Router();

// Admin dashboard route
router.get('/dashboard', adminDashboardController);
