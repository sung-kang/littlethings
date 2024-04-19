import { RouterProvider } from 'react-router-dom';
import router from '@/utils/routes';
import useAuthContext from '@/hooks/useAuthContext';

function App() {
  const { isLoading } = useAuthContext();

  console.log(isLoading);

  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
      Loading. . .
    </div>
  ) : (
    <RouterProvider router={router} />
  );
}

export default App;
