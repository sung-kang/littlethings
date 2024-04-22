import useAuthContext from '@/hooks/useAuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const NavBarProfile = () => {
  const { isLoading, user } = useAuthContext();

  return isLoading ? (
    <Skeleton className="w-64 min-h-[10rem] overflow-hidden rounded-xl">
      <Skeleton className="flex flex-col items-center justify-center w-64 min-h-[10rem]">
        <Skeleton className="h-6 w-3/4 mb-2"></Skeleton>
        <Skeleton className="h-4 w-1/2"></Skeleton>
      </Skeleton>
    </Skeleton>
  ) : (
    <Accordion type="single" collapsible className="shadow-md rounded-xl">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lt-blue-1 text-2xl bg-white font-bold px-4 rounded-xl">
          Account
        </AccordionTrigger>
        <AccordionContent className="flex flex-col justify-center items-center overflow-hidden bg-white font-bold px-4 rounded-xl">
          <Link
            className="text-lt-purple-2 underline hover:text-lt-purple-1 text-lg"
            to="/profile"
          >
            {`${user.firstName} ${user.lastName}`}
          </Link>
          <div className="text-lt-purple-1 text-center text-xs">
            {user.email}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default NavBarProfile;
