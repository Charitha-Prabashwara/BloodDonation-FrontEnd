import { BrowserRouter as GuestBrowserRouter, Route, Routes } from 'react-router-dom';
import  Home from '../pages/Home';

function GuestRouter() {
  return (
    <GuestBrowserRouter>
      <Routes>
          <Route path="/" element={<Home />}/> 
      </Routes>
    </GuestBrowserRouter>
  )
}
export default GuestRouter;