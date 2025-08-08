const express = require('express');
const app = express();
require('dotenv').config(); // Optional, if using .env

// Parse JSON
app.use(express.json());

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');

// Mount routes
app.use('/students', studentRoutes); // existing route
app.use('/auth', authRoutes);        // ✅ this was missing

module.exports = app;
