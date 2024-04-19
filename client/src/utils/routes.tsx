import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '../pages/Register';
import HomePage from '../pages/HomePage';
import ProtectedRoutes from '@/Layout/Protected';
import ErrorPage from '@/pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/', // Base path
    element: <Login />,
    errorElement: <ErrorPage />,

    // Main layout or application entry point
    children: [
      {
        path: '/',
        element: <ProtectedRoutes />,
        children: [
          {
            path: 'homepage',
            element: <HomePage />,
          },
        ],
      },
    ],
  },
  {
    path: 'register', // Matches /register
    element: <Register />,
  },
]);

export default router;
