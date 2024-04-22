import { Navigate, useLocation } from 'react-router-dom';
import useAuthContext from '@/hooks/useAuthContext';
import ProtectedLayout from '@/Layout/ProtectedLayout';

const ProtectedRoutes = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  return user.isAuthenticated ? (
    <ProtectedLayout />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
