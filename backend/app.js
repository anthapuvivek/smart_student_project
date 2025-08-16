const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();

// ====== Middleware ======
app.use(express.json());

// CORS config for Vite frontend (ports 5173/5174)
app.use(
  cors({
    origin: [
      'http://localhost:5173', 
      'http://localhost:5174',
      'http://localhost:3000',
      'http://localhost:5000'
    ],
    credentials: true, // Allow cookies if needed
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ====== Import routes ======
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

// ====== Mount routes ======
app.use('/students', studentRoutes);      // GET /students
app.use('/auth', authRoutes);             // POST /auth/login, /auth/signup
app.use('/attendance', attendanceRoutes); // POST /attendance/mark

// ====== Base route ======
app.get('/', (req, res) => {
  res.send('🚀 Smart Student Backend is running!');
});

// ====== Health check ======
app.get('/health', (req, res) => {
  db.query('SELECT 1 AS db_ok', (err) => {
    if (err) {
      return res.status(500).json({ status: 'error', db: 'down', message: err.code || err.message });
    }
    res.json({ status: 'ok', db: 'up' });
  });
});

// ====== 404 handler ======
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;

