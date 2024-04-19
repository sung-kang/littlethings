import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage, HomePage, Login, Register } from '@/pages';
import ProtectedRoutes from '@/utils/ProtectedRoutes';
import AuthRedirect from '@/utils/AuthRedirect';

const router = createBrowserRouter([
  {
    element: <AuthRedirect />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Login />,
        index: true,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: 'homepage',
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
