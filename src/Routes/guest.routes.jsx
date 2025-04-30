import {Route, Routes } from 'react-router-dom';
import  Home from '../pages/Home';
import AboutUs from '../pages/AboutUs'
import Blog from '../pages/Blog'
import NotFound from '../pages/404';
import ApiTest from '../pages/ApiTest';

import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

function GuestRouter() {
  return (
     
      <Routes>
          <Route index element={<Home />}/> 

          <Route path="/statistics" element={<NotFound />}/> 
          <Route path="/blog" element={<Blog />}/> 
          <Route path="/about-us" element={<AboutUs />}/>

          <Route path="/login" element={<Login />}/> 
          <Route path="/register" element={<Register />}/> 
          {/* <Route path="/forgot-password" element={<NotFound />}/> */}

          {/* Backend api is working! TEST ROUTE */}
          <Route path="/test" element={<ApiTest />}/>  

      </Routes>
    
  )
}
export default GuestRouter;