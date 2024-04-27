import { RouterProvider } from 'react-router-dom';
import router from '@/utils/routes';
import useAuthContext from '@/hooks/useAuthContext';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const { isLoading } = useAuthContext();

  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
      Loading. . .
    </div>
  ) : (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
