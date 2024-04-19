import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '@/hooks/useAuthContext';

const ProtectedRoutes = () => {
  const { user } = useAuthContext();

  return user.isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
