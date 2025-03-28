import {Route, Routes } from 'react-router-dom';
import  Home from '../pages/Home';
import NotFound from '../pages/404';
import ApiTest from '../pages/ApiTest';

function GuestRouter() {
  return (
     
      <Routes>
          <Route index element={<Home />}/> 

          <Route path="/statistics" element={<NotFound />}/> 
          <Route path="/blog" element={<NotFound />}/> 
          <Route path="/aboutus" element={<NotFound />}/>

          <Route path="/login" element={<NotFound />}/> 
          <Route path="/register" element={<NotFound />}/> 
          <Route path="/forgot-password" element={<NotFound />}/>

          {/* Backend api is working! TEST ROUTE */}
          <Route path="/test" element={<ApiTest />}/>  

      </Routes>
    
  )
}
export default GuestRouter;