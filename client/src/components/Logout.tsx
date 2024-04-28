import useAuthContext from '@/hooks/useAuthContext';
import { Button } from './ui/button';

const Logout = () => {
  const { logoutUser } = useAuthContext();

  return (
    <Button
      onClick={logoutUser}
      variant={'destructive'}
      className="w-64 min-h-[2rem]"
    >
      Log Out
    </Button>
  );
};

export default Logout;
