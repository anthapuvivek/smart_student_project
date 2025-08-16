const attendanceModel = require('../models/attendanceModel');

// Add attendance
exports.addAttendance = (req, res) => {
  const { student_id, date, status } = req.body || {};

  // Basic validation
  const allowedStatuses = new Set(['present', 'absent', 'late']);
  const studentIdNum = Number(student_id);

  if (!Number.isInteger(studentIdNum) || studentIdNum <= 0) {
    return res.status(400).json({ error: 'Invalid or missing student_id' });
  }

  if (!date || Number.isNaN(Date.parse(date))) {
    return res.status(400).json({ error: 'Invalid or missing date (use YYYY-MM-DD)' });
  }

  if (!status || !allowedStatuses.has(String(status))) {
    return res.status(400).json({ error: "Invalid or missing status. Allowed: 'present', 'absent', 'late'" });
  }

  attendanceModel.createAttendanceRecord(studentIdNum, date, status, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: '✅ Attendance added successfully!' });
  });
};

// Mark attendance for multiple students (used by frontend)
exports.markAttendance = (req, res) => {
  const { date, records } = req.body || {};

  // Basic validation
  if (!date || Number.isNaN(Date.parse(date))) {
    return res.status(400).json({ error: 'Invalid or missing date (use YYYY-MM-DD)' });
  }

  if (!Array.isArray(records) || records.length === 0) {
    return res.status(400).json({ error: 'Records array is required and must not be empty' });
  }

  // Validate each record
  for (const record of records) {
    if (!record.studentId || !record.status) {
      return res.status(400).json({ error: 'Each record must have studentId and status' });
    }
    
    if (!['P', 'A'].includes(record.status)) {
      return res.status(400).json({ error: 'Status must be P (Present) or A (Absent)' });
    }
  }

  // Convert frontend format to backend format
  const attendanceData = records.map(record => ({
    student_id: record.studentId,
    date: date,
    status: record.status === 'P' ? 'present' : 'absent'
  }));

  // Use the model to create multiple attendance records
  attendanceModel.createMultipleAttendanceRecords(attendanceData, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: '✅ Attendance marked successfully for all students!' });
  });
};

// Get attendance by student or date
exports.getAttendance = (req, res) => {
  const { student_id, date } = req.query;

  attendanceModel.findAttendance({ student_id, date }, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Update attendance
exports.updateAttendance = (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};

  // Validate id
  const attendanceId = Number(id);
  if (!Number.isInteger(attendanceId) || attendanceId <= 0) {
    return res.status(400).json({ error: 'Invalid attendance id' });
  }

  // Validate status
  const allowedStatuses = new Set(['present', 'absent', 'late']);
  if (!status || !allowedStatuses.has(String(status))) {
    return res.status(400).json({ error: "Invalid status. Allowed: 'present', 'absent', 'late'" });
  }

  attendanceModel.updateAttendanceStatus(attendanceId, status, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.json({ message: '✅ Attendance updated successfully!' });
  });
};

// Delete attendance
exports.deleteAttendance = (req, res) => {
  const { id } = req.params;
  const attendanceId = Number(id);

  if (!Number.isInteger(attendanceId) || attendanceId <= 0) {
    return res.status(400).json({ error: 'Invalid attendance id' });
  }

  attendanceModel.deleteAttendanceById(attendanceId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.json({ message: '🗑️ Attendance deleted successfully!' });
  });
};
