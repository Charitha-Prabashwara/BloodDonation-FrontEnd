import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserDashboard from '../pages/User/Common/UserDashboard';
import NotFound from '../pages/NotFound';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (!user || user.role !== 'user') {navigate('/login', { replace: true })}
  }, [user, navigate]);

  if (!user || user.role !== 'user') {return null}
  return children;
};

function UserRouter() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<ProtectedRoute> <UserDashboard /> </ProtectedRoute>} 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default UserRouter;