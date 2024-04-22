import { Navigate } from 'react-router-dom';
import useAuthContext from '@/hooks/useAuthContext';
import ProtectedLayout from '@/Layout/ProtectedLayout';

const ProtectedRoutes = () => {
  const { user } = useAuthContext();

  return user.isAuthenticated ? (
    <ProtectedLayout />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoutes;
