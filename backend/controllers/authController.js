const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

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

module.exports = {
  signup,
  login
};
