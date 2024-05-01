import { NavBar, ToggleTheme } from '@/components';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  return (
    <main className="flex h-screen">
      <NavBar />
      <div className="absolute top-4 right-4 z-10">
        <ToggleTheme />
      </div>
      <div className="flex-grow overflow-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default ProtectedLayout;
