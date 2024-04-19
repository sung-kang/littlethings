import { Outlet, Navigate } from 'react-router-dom';
const ProtectedRoutes = () => {
  const userAuthed = false;

  return userAuthed ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
