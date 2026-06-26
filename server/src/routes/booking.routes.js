const express = require('express');
const router = express.Router();
const { createBooking, getBookings } = require('../controllers/booking.controller');

router.get('/', getBookings);
router.post('/', createBooking);

module.exports = router;
