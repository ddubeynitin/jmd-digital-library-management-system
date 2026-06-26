const express = require('express');
const router = express.Router();
const { getSlots, createSlot } = require('../controllers/slot.controller');

router.get('/', getSlots);
router.post('/', createSlot);

module.exports = router;
