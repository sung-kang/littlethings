import { NavBar } from '@/components';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

const ProtectedLayout = () => {
  return (
    <main className="flex h-screen">
      <NavBar />
      <Toaster />
      <div className="flex-grow overflow-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default ProtectedLayout;
