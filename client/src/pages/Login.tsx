import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useAuthContext from '@/hooks/useAuthContext';

type LoginFormFields = {
  email: string;
  password: string;
};

const Login = () => {
  const { error, isLoading, login } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  const onSubmit = async (data: LoginFormFields) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-4"
      >
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
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
          <p className="mt-1 text-red-500 text-xs">{errors.email.message}</p>
        )}

        <Input
          type="password"
          id="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
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
          <p className="mt-1 text-red-500 text-xs">{errors.password.message}</p>
        )}

        {/* server side error */}
        {error?.map((err, idx) => (
          <div key={idx} className="mt-1 text-red-500 text-xs">
            {err.message}
          </div>
        ))}

        <Button className=" text-green-500 w-full" variant="outline">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;
