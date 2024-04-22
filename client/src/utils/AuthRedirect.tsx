import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthContext from '@/hooks/useAuthContext';

const AuthRedirect = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const previousLocation = location?.state?.from?.pathname ?? '/homepage';

  return user.isAuthenticated ? (
    <Navigate to={previousLocation} replace />
  ) : (
    <Outlet />
  );
};

export default AuthRedirect;
