// src/api/api.js
import axios from "axios";

// Create Axios instance with backend API URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ✅ Must match Netlify env variable
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
