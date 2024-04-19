import { RouterProvider } from 'react-router-dom';
import router from './utils/routes';

function App() {
  // return 'hello';

  return <RouterProvider router={router} />;
}

export default App;
