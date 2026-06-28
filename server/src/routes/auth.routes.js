const express = require('express');
const router = express.Router();
const {
  login,
  register,
  requestLoginOtp,
  verifyLoginOtp,
  requestPasswordResetOtp,
  resetPasswordWithOtp,
} = require('../controllers/auth.controller');

router.post('/login', login);
router.post('/login/request-otp', requestLoginOtp);
router.post('/login/verify-otp', verifyLoginOtp);
router.post('/password/request-reset-otp', requestPasswordResetOtp);
router.post('/password/reset-with-otp', resetPasswordWithOtp);
router.post('/register', register);

module.exports = router;
