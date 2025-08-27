import axios from "axios";

const api = axios.create({
  // This baseURL must be localhost to connect to your local backend
  baseURL: "http://localhost:5000/api",
});

// Add token automatically if available
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
