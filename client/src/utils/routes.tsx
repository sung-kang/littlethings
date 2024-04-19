import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage, Homepage, Login, Register } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,

    // children: [
    //   {
    //     path: '/',
    //     element: <ProtectedRoutes />,
    //     children: [
    //       {
    //         path: 'homepage',
    //         element: <HomePage />,
    //       },
    //     ],
    //   },
    // ],
  },
  {
    path: 'register',
    element: <Register />,
  },
]);

export default router;
