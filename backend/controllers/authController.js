

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { generateTokenHex, generateOTP } = require('../utils/authHelpers');
const { sendResetEmail } = require('../utils/mailer');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup Controller
const signup = async (req, res) => {
  try {
    const { name, email, password, role = 'student' } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'Name, email, and password are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters long' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = { 
      name, 
      email, 
      password: hashedPassword, 
      role 
    };

    userModel.createUser(newUser, (err, result) => {
      if (err) {
        if (err.message === 'Email already exists') {
          return res.status(409).json({ error: 'Email already exists' });
        }
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error occurred' });
      }

      res.status(201).json({ 
        message: 'User created successfully',
        user: {
          id: result.insertId,
          name,
          email,
          role
        }
      });
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    userModel.getUserByEmail(email, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error occurred' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Password comparison error:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (!isMatch) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
          { 
            id: user.id, 
            email: user.email,
            role: user.role 
          },
          JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.status(200).json({ 
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      });
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Request password reset (email or phone)
const requestPasswordReset = async (req, res) => {
  try {
    const { email, phone } = req.body || {};
    if (!email && !phone) {
      return res.status(400).json({ error: 'Provide email or phone' });
    }

    const handleDone = () => {
      return res.json({ message: 'If an account exists, you will receive reset instructions.' });
    };

    const onUserFound = async (user) => {
      const expiry = new Date(Date.now() + (email ? 60 * 60 * 1000 : 10 * 60 * 1000));

      if (email) {
        const token = generateTokenHex();
        userModel.setResetToken(user.id, token, expiry, async (err) => {
          if (err) return res.status(500).json({ error: err.message });
          try {
            await sendResetEmail(user.email, token);
          } catch (mailErr) {
            console.warn('Email send failed (logged only in dev):', mailErr.message);
          }
          return handleDone();
        });
      } else {
        const otp = generateOTP();
        userModel.setResetToken(user.id, otp, expiry, (err) => {
          if (err) return res.status(500).json({ error: err.message });
          // For now, log OTP to console. Integrate Twilio later if needed.
          console.log(`[SMS:RESET] To: ${user.phone} OTP: ${otp}`);
          return handleDone();
        });
      }
    };

    if (email) {
      userModel.getUserByEmail(email, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!rows || rows.length === 0) return handleDone();
        return onUserFound(rows[0]);
      });
    } else {
      userModel.getUserByPhone(phone, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!rows || rows.length === 0) return handleDone();
        return onUserFound(rows[0]);
      });
    }
  } catch (error) {
    console.error('requestPasswordReset error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Validate reset token (optional GET to pre-validate link)
const validateResetToken = (req, res) => {
  const { token } = req.query || {};
  if (!token) return res.status(400).json({ error: 'token required' });
  userModel.getUserByValidResetToken(token, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows || rows.length === 0) return res.status(400).json({ error: 'Invalid or expired token' });
    return res.json({ valid: true });
  });
};

// Reset password via email token
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body || {};
    if (!token || !newPassword) return res.status(400).json({ error: 'token and newPassword required' });
    if (String(newPassword).length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

    userModel.getUserByValidResetToken(token, async (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!rows || rows.length === 0) return res.status(400).json({ error: 'Invalid or expired token' });

      const user = rows[0];
      const hashed = await bcrypt.hash(newPassword, 10);
      userModel.updateUserPassword(user.id, hashed, (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        return res.json({ message: 'Password reset successful' });
      });
    });
  } catch (error) {
    console.error('resetPassword error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Reset password via phone + OTP
const resetPasswordPhone = async (req, res) => {
  try {
    const { phone, otp, newPassword } = req.body || {};
    if (!phone || !otp || !newPassword) return res.status(400).json({ error: 'phone, otp, newPassword required' });
    if (String(newPassword).length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

    userModel.getUserByPhoneAndValidOTP(phone, otp, async (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!rows || rows.length === 0) return res.status(400).json({ error: 'Invalid or expired OTP' });
      const user = rows[0];
      const hashed = await bcrypt.hash(newPassword, 10);
      userModel.updateUserPassword(user.id, hashed, (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        return res.json({ message: 'Password reset successful' });
      });
    });
  } catch (error) {
    console.error('resetPasswordPhone error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  signup,
  login,
  requestPasswordReset,
  validateResetToken,
  resetPassword,
  resetPasswordPhone
};
