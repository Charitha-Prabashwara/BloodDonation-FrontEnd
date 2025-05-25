import axios from "axios";


import { LoginInterceptor, UnauthorizedLoginInterceptor } from "../api/interceptors/loginInterceptor";
import store from "../Redux/store";
import { setCredentials } from '../Redux/authSlice';

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

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
// Queue for failed requests while refreshing
let failedRequestsQueue = [];

// Add response interceptor for error handling
API.interceptors.response.use(
  (response) =>{
    try{

      //Login interception
      LoginInterceptor(response);
      
    } catch (error) {
      return Promise.reject(error);
    }

    
    return response
  },
  async(error) => {

    //Login error unauthorized interception
   
    try {
       
    
       //toast.error(error.response.data.message || "An error occurred");
         const originalRequest = error.config;
      
         // Only handle 401 errors (except login requests)
          if (error.response?.status === 401 && !originalRequest.url.includes('/login')) {
            
            // If already refreshing, add request to queue
            if (isRefreshing) {
              return new Promise((resolve, reject) => {
                failedRequestsQueue.push({ resolve, reject });
              }).then(() => {
                return API(originalRequest);
              }).catch(err => {
                return Promise.reject(err);
              });
            }
          
          isRefreshing = true;
      
          try {
              // Attempt to refresh token
              const response = await API.post('/user/refresh-access-token/', {}, {
                withCredentials: true
              });
      
              const data = response.data.data;
      
              // Store new token
         
              store.dispatch(setCredentials({ 
                accessToken: data.accessToken,
                user:data.user
              }));
      
              // Update Authorization header
              //API.defaults.headers.common['authorization'] = `Bearer ${data.accessToken}`;
              originalRequest.headers['authorization'] =`Bearer ${data.accessToken}`;
              originalRequest.headers['Content-Type'] = 'application/json';
      
      
              // Process queued requests
              failedRequestsQueue.forEach((promise) => promise.resolve());
              
              // Retry original request
              return API(originalRequest);
            } catch (refreshError) {
              // Refresh failed - clear credentials and redirect
              failedRequestsQueue.forEach((promise) => promise.reject(refreshError));
              
              return Promise.reject(refreshError);
            } finally {
              isRefreshing = false;
              failedRequestsQueue = [];
            }
      }
         
    } catch (error) {
       return Promise.reject(error);
    }
    

    return Promise.reject(error);
  }
);

export default API;
