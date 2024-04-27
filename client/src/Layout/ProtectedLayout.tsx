import { NavBar } from '@/components';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  return (
    <main className="flex h-screen">
      <NavBar />
      <div className="flex-grow overflow-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default ProtectedLayout;
