import {Route, Routes } from 'react-router-dom';
import  Home from '../pages/Home';
import NotFound from '../pages/404';

function GuestRouter() {
  return (
    <div>
    
      <Routes>
          <Route index element={<Home />}/> 
          <Route path="/statistics" element={<NotFound />}/> 
          <Route path="blog" element={<NotFound />}/> 
          <Route path="/aboutus" element={<NotFound />}/> 
      </Routes>
    
    </div>
  )
}
export default GuestRouter;