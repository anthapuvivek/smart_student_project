// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Use proxy instead of hardcoded localhost:5000
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests if logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // store token in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
