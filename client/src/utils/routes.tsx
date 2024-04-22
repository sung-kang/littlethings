import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage, HomePage, Login, Register, Summary } from '@/pages';
import ProtectedRoutes from '@/utils/ProtectedRoutes';
import AuthRedirect from '@/utils/AuthRedirect';
import TestComponents from '@/pages/NewLittleThingForm';

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
      {
        path: 'test-components',
        element: <TestComponents />,
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
      {
        path: 'summary',
        element: <Summary />,
      },
    ],
  },
]);

export default router;
