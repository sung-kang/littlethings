import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: 'homepage',
//         element: <HomePage />,
//       },
//       {
//         path: 'register',
//         element: <Register />,
//       },
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>
);
