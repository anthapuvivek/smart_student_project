const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
try {
  const authRoutes = require('./routes/authRoutes');
  const studentRoutes = require('./routes/studentRoutes');
  const attendanceRoutes = require('./routes/attendanceRoutes');

  app.use('/auth', authRoutes);           // /auth/login, /auth/register
  app.use('/students', studentRoutes);    // /students/*
  app.use('/attendance', attendanceRoutes); // /attendance/*

  console.log('✅ Routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading routes:', error);
}

app.get('/', (req, res) => {
  res.send('🚀 Smart Student Backend is running!');
});

// 404 handler (Express 5 + path-to-regexp v8 compatible)
app.use((req, res) => {
  console.log(`404: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`🚀 Available routes:`);
  console.log(`   POST /auth/register`);
  console.log(`   POST /auth/login`);
});
