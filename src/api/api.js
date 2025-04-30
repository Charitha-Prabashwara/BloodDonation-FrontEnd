import axios from "axios";


import { LoginInterceptor, UnauthorizedLoginInterceptor } from "../api/interceptors/loginInterceptor";

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
    try{

      //Login interception
      LoginInterceptor(response);
      
    } catch (error) {
      console.error(error);
    }

    
    return response
  },
  (error) => {

    //Login error unauthorized interception
    UnauthorizedLoginInterceptor(error);

    return Promise.reject(error);
  }
);

export default API;
