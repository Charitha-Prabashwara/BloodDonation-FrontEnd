import axios from "axios";
import meta from "vite-meta";

const API = axios.create({
  baseURL: meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000", // Store API URL in environment variables
  timeout: 10000, // Set timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Securely store tokens
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., logout)
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
