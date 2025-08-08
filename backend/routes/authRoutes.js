const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes are working!' });
});

// Routes
router.post('/register', authController.signup); // Signup
router.post('/login', authController.login);     // Login

module.exports = router;

