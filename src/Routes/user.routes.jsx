import {Route, Routes, } from 'react-router-dom';
import UserDashboard from '../pages/User/Common/UserDashboard'
import NotFound from '../pages/NotFound'; 

// Mock function to check if the user is authenticated
const isAuthenticated = () => {
    // Replace this with your actual authentication logic
    return true
  };
  
  // Protected Route Component
  const ProtectedRoute = ({ element: Component }) => {
    return isAuthenticated() ? Component : <Navigate to="/login" replace />;
  };

function UserRouter() {
    return (
     
        <Routes>
            <Route path="/profile" element={<ProtectedRoute element={<UserDashboard />} />} />
        </Routes>
      
    )
  }
  export default UserRouter;