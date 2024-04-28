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
import useAuthContext from '@/hooks/useAuthContext';
import {
  UpdateAccountFormFields,
  NavBarProfileTabProps,
} from '@/types/AccountFormFieldTypes';
import { ApiErrorType } from '@/types/Common';
import * as usersApi from '@/api-client/usersApi';

const UpdateAccountTab = ({ setIsSubmittingForm }: NavBarProfileTabProps) => {
  const { user, setUser } = useAuthContext();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateAccountFormFields>();

  const onSubmit = async (data: UpdateAccountFormFields) => {
    setIsSubmittingForm(true);

    try {
      const updatedUserData = await usersApi.updateAccount(data);

      if (updatedUserData.errors) {
        return updatedUserData.errors.map((error: ApiErrorType) =>
          toast({
            variant: 'destructive',
            title: error.message,
          })
        );
      }

      setUser({ ...user, ...updatedUserData.message });

      toast({
        title: 'Successfully updated account information!',
      });
    } catch (error) {
      console.error(errors);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <form id="updateAccount" onSubmit={handleSubmit(onSubmit)}>
      <TabsContent value="updateAccount" className="text-center">
        <Card>
          <CardHeader>
            <CardTitle>Update Account</CardTitle>
            <CardDescription>
              Update your account information here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 flex flex-col justify-center items-center">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                defaultValue={`${user.firstName}`}
                placeholder="First Name"
                className="col-span-3 text-center"
                {...register('firstName', {
                  required: 'Please enter a valid first name',
                  maxLength: {
                    value: 255,
                    message: 'First name must be no more than 255 characters',
                  },
                })}
              />
              {errors.firstName && (
                <p className="text-red-400 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-1 flex flex-col justify-center items-center">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                defaultValue={`${user.lastName}`}
                placeholder="Last Name"
                className="col-span-3 text-center"
                {...register('lastName', {
                  required: 'Please enter a valid last name',
                  maxLength: {
                    value: 255,
                    message: 'Last name must be no more than 255 characters',
                  },
                })}
              />
              {errors.lastName && (
                <p className="text-red-400 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="space-y-1 flex flex-col justify-center items-center">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                defaultValue={`${user.email}`}
                placeholder="Email"
                className="col-span-3 text-center"
                {...register('email', {
                  required: 'Please enter a valid email address',
                  maxLength: {
                    value: 255,
                    message: 'Email must be no more than 255 characters',
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email format',
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email.message}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </form>
  );
};

export default UpdateAccountTab;
