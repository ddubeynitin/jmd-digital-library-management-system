const express = require('express');
const router = express.Router();
const {
  getSeatsByBatchAndShift,
  getPendingSeatRequests,
  approveSeatRequest,
  rejectSeatRequest,
  createSeat,   
  updateSeat,
  deleteSeat,
} = require('../controllers/seat.controller');

router.get('/', getSeatsByBatchAndShift);
router.post('/', createSeat);
router.get('/requests', getPendingSeatRequests);
router.put('/:id/approve', approveSeatRequest);
router.put('/:id/reject', rejectSeatRequest);
router.put('/:id', updateSeat);
router.delete('/:id', deleteSeat);

module.exports = router;
