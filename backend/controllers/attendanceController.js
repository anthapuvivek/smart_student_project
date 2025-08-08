const db = require('../config/db');

// Add attendance
exports.addAttendance = (req, res) => {
  const { student_id, date, status } = req.body;

  const query = 'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)';
  db.query(query, [student_id, date, status], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: '✅ Attendance added successfully!' });
  });
};

// Get attendance by student or date
exports.getAttendance = (req, res) => {
  const { student_id, date } = req.query;

  let query = 'SELECT * FROM attendance WHERE 1=1';
  const params = [];

  if (student_id) {
    query += ' AND student_id = ?';
    params.push(student_id);
  }

  if (date) {
    query += ' AND date = ?';
    params.push(date);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Update attendance
exports.updateAttendance = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = 'UPDATE attendance SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: '✅ Attendance updated successfully!' });
  });
};

// Delete attendance
exports.deleteAttendance = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM attendance WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: '🗑️ Attendance deleted successfully!' });
  });
};
