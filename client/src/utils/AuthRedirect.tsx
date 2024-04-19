import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '@/hooks/useAuthContext';

const AuthRedirect = () => {
  const { user } = useAuthContext();

  console.log(user.isAuthenticated);

  return user.isAuthenticated ? (
    <Navigate to="/homepage" replace />
  ) : (
    <Outlet />
  );
};

export default AuthRedirect;
