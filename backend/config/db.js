const mysql = require('mysql2');
require('dotenv').config();

const databaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'vivek',
  database: process.env.DB_NAME || 'smart_student_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const db = mysql.createPool(databaseConfig);

db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.code || err.message);
    return; // Do not crash the app; keep running so API can report health
  }
  console.log('✅ Connected to the MySQL database.');
  connection.release();
});

module.exports = db;

