const db = require('../config/db');

// Create user
const createUser = (userData, callback) => {
  const { name, email, password, role, phone = null, verified = 0, verification_token = null } = userData;
  const query = 'INSERT INTO users (name, email, password, role, phone, verified, verification_token) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [name, email, password, role, phone, verified, verification_token], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return callback(new Error('Email already exists'));
      }
      return callback(err);
    }
    callback(null, result);
  });
};

// Get user by email
const getUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  
  db.query(query, [email], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Get user by ID
const getUserById = (id, callback) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Get user by phone
const getUserByPhone = (phone, callback) => {
  const query = 'SELECT * FROM users WHERE phone = ?';
  db.query(query, [phone], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Set reset token and expiry
const setResetToken = (userId, token, expiry, callback) => {
  const query = 'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?';
  db.query(query, [token, expiry, userId], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Get user by valid reset token
const getUserByValidResetToken = (token, callback) => {
  const query = 'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()';
  db.query(query, [token], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Get user by phone + valid OTP (stored in reset_token)
const getUserByPhoneAndValidOTP = (phone, otp, callback) => {
  const query = 'SELECT * FROM users WHERE phone = ? AND reset_token = ? AND reset_token_expiry > NOW()';
  db.query(query, [phone, otp], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Update password and clear reset token
const updateUserPassword = (userId, hashedPassword, callback) => {
  const query = 'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?';
  db.query(query, [hashedPassword, userId], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByPhone,
  setResetToken,
  getUserByValidResetToken,
  getUserByPhoneAndValidOTP,
  updateUserPassword,
};