// src/services/attendanceService.js
import axios from "axios";

const API_URL = "http://localhost:5000"; // backend base URL

/**
 * Get attendance record for a specific student
 * @param {string|number} studentId - ID of the student
 * @returns {Promise} Axios response data
 */
export const getAttendance = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/attendance/${studentId}`);
    return response.data; // expecting attendance history from backend
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw error;
  }
};

/**
 * Mark attendance for a class on a given date
 * @param {string|number} classId - ID of the class
 * @param {string} date - Date in 'YYYY-MM-DD' format
 * @param {Array} attendanceData - Array of { studentId, status: 'P'|'A' }
 * @returns {Promise} Axios response data
 */
export const markAttendance = async (classId, date, attendanceData) => {
  try {
    const payload = {
      classId,
      date,
      attendance: attendanceData,
    };
    const response = await axios.post(`${API_URL}/attendance`, payload);
    return response.data; // expecting success message or saved records
  } catch (error) {
    console.error("Error marking attendance:", error);
    throw error;
  }
};

/**
 * Submit attendance for multiple students (used by AttendancePage)
 * @param {Object} payload - { date, records: [{ studentId, status }] }
 * @returns {Promise} Axios response data
 */
export const submitAttendance = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/attendance/mark`, payload);
    return response.data;
  } catch (error) {
    console.error("Error submitting attendance:", error);
    throw error;
  }
};
