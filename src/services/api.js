import axios from "axios";

// This baseURL points directly to your live backend on Render.
// This is the correct code for your Netlify website to work.
const api = axios.create({
  baseURL: "https://amaravati-backend-cj4n.onrender.com/api",
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