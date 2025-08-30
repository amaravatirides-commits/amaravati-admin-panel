import axios from "axios";

// Base URL pointing to your Render backend
const api = axios.create({
  baseURL: "https://amaravati-backend-cj4n.onrender.com/api",
});

// Automatically attach token if available
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
