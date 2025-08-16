const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Hash a password (async)
function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

// Compare plain password with hashed password
function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

// Generate a long random token (hex string)
function generateTokenHex() {
  return crypto.randomBytes(32).toString('hex');
}

// Generate a 6-digit OTP code (string)
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = {
  hashPassword,
  comparePassword,
  generateTokenHex,
  generateOTP
};
