import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DeleteAccountFormFields } from '@/types/AccountFormFieldTypes';
import { ApiErrorType } from '@/types/Common';
import useAuthContext from '@/hooks/useAuthContext';

const DeleteAccountTab = () => {
  const { logoutUser } = useAuthContext();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteAccountFormFields>();
  const navigate = useNavigate();

  const onSubmit = async (data: DeleteAccountFormFields) => {
    try {
      const response = await fetch('/api/v1/users/delete-user', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const updatedUserData = await response.json();

      console.log('updatedUserData', updatedUserData);

      if (!response.ok) {
        return updatedUserData.errors.map((error: ApiErrorType) =>
          toast({
            title: error.message,
          })
        );
      }

      logoutUser();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form id="deleteAccount" onSubmit={handleSubmit(onSubmit)}>
      <TabsContent value="deleteAccount" className="text-center">
        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
            <CardDescription>
              Delete your account here.&nbsp;
              <br />
              <span className="text-red-500 font-semibold">
                This action is irreversible.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 flex flex-col justify-center items-center">
              <Label htmlFor="deleteAccountPassword">Current Password</Label>
              <Input
                type="password"
                id="deleteAccountPassword"
                placeholder="Current Password"
                className="col-span-3 text-center"
                {...register('password', {
                  required: 'Please enter your password',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  maxLength: {
                    value: 255,
                    message: 'Password must be no more than 255 characters',
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </form>
  );
};

export default DeleteAccountTab;
