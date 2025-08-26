// src/api/axios.js
import axios from "axios";
import { getToken, removeToken } from "../utils/auth";

// ✅ Base URL for backend API
// Make sure you have this set in your .env file:
// VITE_API_BASE_URL=https://amaravati-backend-cj4n.onrender.com/api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// ✅ Attach JWT token automatically to every request (if available)
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle 401 Unauthorized globally → logout + redirect
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      removeToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
