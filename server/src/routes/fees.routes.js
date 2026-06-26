const express = require('express');
const router = express.Router();
const {
    getAllFees,
    getFeeById,
    getFeesByStudent,
    createFee,
    updateFee,
    payFee,
    deleteFee,
    getFeesByStatus
} = require('../controllers/fees.controller');


router.get('/fees', getAllFees);
router.get('/fees/status/:status', getFeesByStatus);
router.get('/fees/student/:studentId', getFeesByStudent);
router.get('/fees/:id', getFeeById);
router.post('/fees', createFee);
router.put('/fees/:id', updateFee);
router.put('/fees/:id/pay', payFee);
router.delete('/fees/:id', deleteFee);

module.exports = router;
