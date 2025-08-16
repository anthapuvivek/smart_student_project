const db = require('../config/db');

function createAttendanceRecord(studentId, date, status, callback) {
  const insertQuery = 'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)';
  db.query(insertQuery, [studentId, date, status], (error, result) => {
    if (error) return callback(error);
    callback(null, result);
  });
}

function createMultipleAttendanceRecords(attendanceData, callback) {
  if (!Array.isArray(attendanceData) || attendanceData.length === 0) {
    return callback(new Error('Attendance data must be a non-empty array'));
  }

  const insertQuery = 'INSERT INTO attendance (student_id, date, status) VALUES ?';
  const values = attendanceData.map(record => [record.student_id, record.date, record.status]);

  db.query(insertQuery, [values], (error, result) => {
    if (error) return callback(error);
    callback(null, result);
  });
}

function findAttendance(params, callback) {
  const { student_id: studentId, date } = params || {};
  let selectQuery = 'SELECT * FROM attendance WHERE 1=1';
  const values = [];

  if (studentId) {
    selectQuery += ' AND student_id = ?';
    values.push(studentId);
  }
  if (date) {
    selectQuery += ' AND date = ?';
    values.push(date);
  }

  db.query(selectQuery, values, (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
}

function updateAttendanceStatus(attendanceId, status, callback) {
  const updateQuery = 'UPDATE attendance SET status = ? WHERE id = ?';
  db.query(updateQuery, [status, attendanceId], (error, result) => {
    if (error) return callback(error);
    callback(null, result);
  });
}

function deleteAttendanceById(attendanceId, callback) {
  const deleteQuery = 'DELETE FROM attendance WHERE id = ?';
  db.query(deleteQuery, [attendanceId], (error, result) => {
    if (error) return callback(error);
    callback(null, result);
  });
}

module.exports = {
  createAttendanceRecord,
  createMultipleAttendanceRecords,
  findAttendance,
  updateAttendanceStatus,
  deleteAttendanceById,
};
