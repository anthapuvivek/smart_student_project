import axios from "axios";

const API_URL = "http://localhost:5000"; // backend base URL

/**
 * Get all students for a specific class
 * @param {string|number} classId - ID of the class
 * @returns {Promise} Axios response promise
 */
export const getStudentsByClass = async (classId) => {
  try {
    const response = await axios.get(`${API_URL}/students/${classId}`);
    return response.data; // Assuming backend returns { students: [...] }
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

/**
 * Get all students (used by attendance and students pages)
 * @returns {Promise} Axios response promise
 */
export const fetchStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`);
    return response.data; // Backend returns array of students directly
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};
