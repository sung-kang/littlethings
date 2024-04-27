import { useState } from 'react';
import useAuthContext from '@/hooks/useAuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  ChangePasswordTab,
  DeleteAccountTab,
  UpdateAccountTab,
} from '@/components';
import { GearIcon } from '@radix-ui/react-icons';

const NavBarProfile = () => {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState('updateAccount');
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  return (
    <div className="bg-white px-6 py-4 shadow-md flex flex-col items-center justify-center w-64 min-h-[10rem] rounded-xl">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-lt-purple-2 text-lg hover:text-lt-purple-1 hover:underline"
          >
            {`${user.firstName} ${user.lastName}`}
            <GearIcon className="ml-1" />
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col justify-center items-center">
          <DialogHeader>
            <DialogTitle className="text-center">Edit Account</DialogTitle>
            <DialogDescription className="text-center">
              Make changes to your account here.
            </DialogDescription>
          </DialogHeader>

          <Tabs
            defaultValue="updateAccount"
            onValueChange={setActiveTab}
            className="w-[400px] min-h-[430px] flex flex-col"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="updateAccount">Account</TabsTrigger>
              <TabsTrigger value="changePassword">Change Password</TabsTrigger>
              <TabsTrigger value="deleteAccount">Delete Account</TabsTrigger>
            </TabsList>

            <UpdateAccountTab setIsSubmittingForm={setIsSubmittingForm} />
            <ChangePasswordTab setIsSubmittingForm={setIsSubmittingForm} />
            <DeleteAccountTab setIsSubmittingForm={setIsSubmittingForm} />
          </Tabs>

          <DialogFooter>
            <Button form={activeTab} disabled={isSubmittingForm} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <p className="px-4 py-2 text-xs text-lt-purple-1 rounded-md underline">
        {user.email}
      </p>
    </div>
  );
};

export default NavBarProfile;
