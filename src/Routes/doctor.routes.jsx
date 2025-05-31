import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DoctorDashboard from '/src/pages/User/Common/DoctorDashboard';
import NotFound from '../pages/NotFound';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user && user.role !== 'doctor') {navigate('/login', { replace: true })}
    
  }, [user, navigate]);

  if (!user) {return null}
  return children;
};


function DoctorRouter() {
    return (
    <Routes>
      <Route 
        path="/" 
        element={<ProtectedRoute> <DoctorDashboard /> </ProtectedRoute>} 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
  }
  export default DoctorRouter;