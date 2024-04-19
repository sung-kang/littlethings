import useAuthContext from '@/hooks/useAuthContext';

const HomePage = () => {
  const { user } = useAuthContext();

  return <div>Welcome {user.lastName}</div>;
};

export default HomePage;
