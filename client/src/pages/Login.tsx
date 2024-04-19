import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type LoginFormFields = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  const onSubmit = async (data: LoginFormFields) => {
    console.log(data);
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const userid = await response.json();
      console.log('userid', userid);
      if (!response.ok) {
        throw new Error('Failed to get repsonse');
      }
    } catch (error) {
      console.log('Login Failed', error);
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
        <Button className=" text-green-500 w-full" variant="outline">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;
