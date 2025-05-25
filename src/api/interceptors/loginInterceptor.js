import store from '../../Redux/store';

import API from '../api';
import { toast } from 'react-toastify';


import { setCredentials } from '../../Redux/authSlice';

export const LoginInterceptor = (response)=>{

    if(response.config.url.includes("/login") && response.status === 200){
        authorized(response);
        
    }
    
}

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
// Queue for failed requests while refreshing
let failedRequestsQueue = [];

export const UnauthorizedLoginInterceptor = async(error) =>{
   
   toast.error(error.response.data.message || "An error occurred");
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
        alert(JSON.stringify(data.accessToken))
        console.log(data.accessToken)
        store.dispatch(setCredentials({ 
          accessToken: data.accessToken,
          user:data.user
        }));

        // Update Authorization header
        //API.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        originalRequest.headers['Authorization'] =`Bearer ${data.accessToken}`;
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
}

const handleUnauthorized = () => {
  // Clear auth state
//   store.dispatch(clearCredentials());
  
//   // Remove token from axios defaults
//   delete api.defaults.headers.common['Authorization'];
  
//   // Redirect to login
//   window.location.href = '/login';
};

const authorized =(response) => {
    // const data = response.data.data;
                              
    //   store.dispatch(setCredentials({accessToken: data.access_token, user: data.user}));
                                                 
    //   const state = store.getState(); 
    //   const authData = state.auth;

    //   console.log("Access Token:", authData.accessToken);
    //   console.log("User Info:", authData.user);
     
      
}

const unauthorized = ()=>{

    // // Handle unauthorized access (e.g., logout)
    //    localStorage.removeItem("authToken");
    //    window.location.href = "/";
    
    //   store.dispatch(clearCredentials())

    //   const state = store.getState(); 
    //   const authData = state.auth;

    //   console.log("Access Token:", authData.accessToken);
    //   console.log("User Info:", authData.user);

    //   console.log('login interceptor working')

}