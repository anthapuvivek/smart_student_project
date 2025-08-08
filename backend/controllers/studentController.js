const db = require('../config/db');

// ✅ GET all students
exports.getAllStudents = (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// ✅ POST: Add a new student
exports.addStudent = (req, res) => {
  const { name, roll_number, class: studentClass, section } = req.body || {};

  // Basic validation
  if (!name || !roll_number || !studentClass || !section) {
    return res.status(400).json({ error: "❌ Please provide name, roll_number, class, and section." });
  }

  const query = 'INSERT INTO students (name, roll_number, class, section) VALUES (?, ?, ?, ?)';
  const values = [name, roll_number, studentClass, section];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: '✅ Student added successfully!' });
  });
};
