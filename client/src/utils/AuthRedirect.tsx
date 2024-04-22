import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '@/hooks/useAuthContext';

const AuthRedirect = () => {
  const { user } = useAuthContext();

  return user.isAuthenticated ? (
    <Navigate to="/homepage" replace />
  ) : (
    <Outlet />
  );
};

export default AuthRedirect;
