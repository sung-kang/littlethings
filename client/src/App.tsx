import { RouterProvider } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import router from '@/utils/routes';
import useAuthContext from '@/hooks/useAuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

function App() {
  const { isLoading } = useAuthContext();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          Loading. . .
        </div>
      ) : (
        <>
          <RouterProvider router={router} />
          <Toaster />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
