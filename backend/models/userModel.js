const db = require('../config/db');

// Create user
const createUser = (userData, callback) => {
  const { name, email, password, role } = userData;
  const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  
  db.query(query, [name, email, password, role], (err, result) => {
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

module.exports = {
  createUser,
  getUserByEmail,
  getUserById
};