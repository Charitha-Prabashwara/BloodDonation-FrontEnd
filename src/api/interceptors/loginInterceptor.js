import store from '../../Redux/store';
import { setCredentials } from '../../Redux/authSlice';

export const LoginInterceptor = (response)=>{

    if(response.config.url.includes("/login") && response.status === 200){
        authorized(response);
        
    }
    
}

export const UnauthorizedLoginInterceptor = (error) =>{
    if(!error.response?.config.url.includes("/login") && error.response?.status === 401){return}
    unauthorized();
}

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