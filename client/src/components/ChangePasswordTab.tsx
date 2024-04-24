import { useForm } from 'react-hook-form';
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
import { ChangePasswordFormFields } from '@/types/AccountFormFieldTypes';
import { ApiErrorType } from '@/types/Common';

const ChangePasswordTab = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChangePasswordFormFields>();

  const onSubmit = async (data: ChangePasswordFormFields) => {
    try {
      const response = await fetch('/api/v1/users/change-password', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const updatedUserData = await response.json();

      if (!response.ok) {
        return updatedUserData.errors.map((error: ApiErrorType) =>
          toast({
            title: error.message,
          })
        );
      }

      toast({
        title: 'Successfully changed password!',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form id="changePassword" onSubmit={handleSubmit(onSubmit)}>
      <TabsContent value="changePassword" className="text-center">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Change to new a password here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 flex flex-col justify-center items-center">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                type="password"
                id="currentPassword"
                placeholder="Current Password"
                className="col-span-3 text-center"
                {...register('currentPassword', {
                  required: 'Please enter your current password',
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
              {errors.currentPassword && (
                <p className="text-red-500 text-xs">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
            <div className="space-y-1 flex flex-col justify-center items-center">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                type="password"
                id="newPassword"
                placeholder="New Password"
                className="col-span-3 text-center"
                {...register('newPassword', {
                  required: 'Please enter your new password',
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
              {errors.newPassword && (
                <p className="text-red-500 text-xs">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="space-y-1 flex flex-col justify-center items-center">
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <Input
                type="password"
                id="confirmNewPassword"
                placeholder="Confirm New Password"
                className="col-span-3 text-center"
                {...register('confirmNewPassword', {
                  required: 'Please enter your password',
                  validate: (val) => {
                    if (watch('newPassword') !== val) {
                      return 'Your new passwords do not match';
                    }
                  },
                })}
              />
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </form>
  );
};

export default ChangePasswordTab;
