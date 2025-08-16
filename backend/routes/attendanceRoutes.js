const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// ✅ Import JWT + role-based middleware
const { authenticate, isTeacher } = require('../middleware/auth');

// ✅ Anyone (with valid token) can add attendance
router.post('/', authenticate, attendanceController.addAttendance);

// ✅ Anyone (with valid token) can view attendance
router.get('/', authenticate, attendanceController.getAttendance);

// ✅ Mark attendance for multiple students (used by frontend)
router.post('/mark', authenticate, isTeacher, attendanceController.markAttendance);

// 🔐 Only authenticated teachers can update attendance
router.put('/:id', authenticate, isTeacher, attendanceController.updateAttendance);

// 🔐 Only authenticated teachers can delete attendance
router.delete('/:id', authenticate, isTeacher, attendanceController.deleteAttendance);

module.exports = router;
