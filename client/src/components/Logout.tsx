import useAuthContext from '@/hooks/useAuthContext';
import { Button } from './ui/button';

const Logout = () => {
  const { logoutUser } = useAuthContext();

  return (
    <Button
      onClick={logoutUser}
      className="bg-red-500 w-64 min-h-[2rem] hover:bg-red-300"
    >
      Log Out
    </Button>
  );
};

export default Logout;
