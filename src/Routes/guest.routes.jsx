import {Route, Routes } from 'react-router-dom';
import  Home from '../pages/Home';
import AboutUs from '../pages/AboutUs'
import Blog from '../pages/Blog'
import NotFound from '../pages/NotFound';
import ApiTest from '../pages/ApiTest';

import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import AccountCreated from '../pages/Auth/AccountCreated';
import Verify from '../pages/Auth/Verify';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import PasswordResetReady from '../pages/Auth/PasswordResetReady';
import PasswordRest from '../pages/Auth/PasswordReset';


function GuestRouter() {
  return (
     
      <Routes>
          <Route index element={<Home />}/> 

          <Route path="/statistics" element={<NotFound />}/> 
          <Route path="/blog" element={<NotFound />}/> 
          <Route path="/aboutus" element={<AboutUs />}/>

          <Route path="/login" element={<Login />}/> 
          <Route path="/register" element={<Register />}/> 
          <Route path="/account-created" element={<AccountCreated/>}/>
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/forgot-password-ready" element={<PasswordResetReady />}/>
          <Route path="/password-reset" element={<PasswordRest />}/>

          {/* Backend api is working! TEST ROUTE */}
          <Route path="/test" element={<ApiTest />}/>  

      </Routes>

  )
}
export default GuestRouter;