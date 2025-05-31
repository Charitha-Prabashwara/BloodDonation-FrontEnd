import {Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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

import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (!user ) {return null}
    if (user && user.role == 'user') {navigate('user', { replace: false })}
    if (user && user.role == 'doctor') {navigate('doctor', { replace: false })}
    
  
  
  }, [user, navigate]);

 
  return children;
};
function GuestRouter() {
  return (
     
      <Routes>
          <Route index element={<Home />}/> 

          <Route path="/statistics" element={<NotFound />}/> 
          <Route path="/blog" element={<NotFound />}/> 
          <Route path="/aboutus" element={<AboutUs />}/>

          <Route path="/login" element={
            <ProtectedRoute> <Login /> </ProtectedRoute>
          }/> 
          <Route path="/register" element={
             <ProtectedRoute> <Register /> </ProtectedRoute>
          }/> 
          <Route path="/account-created" element={
            <ProtectedRoute><AccountCreated/> </ProtectedRoute>
          }/>
          <Route path="/verify" element={
            <ProtectedRoute><Verify/> </ProtectedRoute>
            }/>
          <Route path="/forgot-password" element={
            <ProtectedRoute><ForgotPassword /></ProtectedRoute> 
            }/>
          <Route path="/forgot-password-ready" element={
            <ProtectedRoute><PasswordResetReady /></ProtectedRoute>
            }/>
          <Route path="/password-reset" element={
            <ProtectedRoute><PasswordRest /></ProtectedRoute> 
            }/>

          {/* Backend api is working! TEST ROUTE */}
          <Route path="/test" element={<ApiTest />}/> 

          <Route path="*" element={<NotFound />} /> 

      </Routes>

  )
}
export default GuestRouter;