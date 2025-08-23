// src/api/axios.js
import axios from "axios";
import { getToken, removeToken } from "../utils/auth";

// Axios instance pointing to deployed backend
const api = axios.create({
  baseURL: "https://amaravati-backend-cj4n.onrender.com/api",
});

// Automatically attach token to request headers
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 Unauthorized globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      removeToken();
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
