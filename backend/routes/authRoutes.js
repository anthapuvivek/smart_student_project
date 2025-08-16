const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes are working!' });
});

// Routes
router.post('/signup', authController.signup); // Signup - changed from /register to /signup
router.post('/login', authController.login);     // Login
router.post('/request-password-reset', authController.requestPasswordReset); // Request password reset
router.get('/reset-password', authController.validateResetToken); // Validate token (optional)
router.post('/reset-password', authController.resetPassword); // Reset via email token
router.post('/reset-password-phone', authController.resetPasswordPhone); // Reset via phone OTP

module.exports = router;

