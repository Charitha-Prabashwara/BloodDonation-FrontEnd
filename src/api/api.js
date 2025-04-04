import axios from "axios";


const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,// Store API URL in environment variables
  timeout: 20000, // Set timeout for requests
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
  (response) =>{

    // //Login interception
    // if (response.config.url.includes("/login") && response.status === 200) {
    //   const token = response.data.token; // Adjust based on API response format
    //   if (token) {
    //     localStorage.setItem("authToken", token);
    //   }
    // }
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., logout)
      localStorage.removeItem("authToken");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;
