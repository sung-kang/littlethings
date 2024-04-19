import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import splash from '/Learning-bro.svg';
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
    <>
      <div className="flex h-screen">
        <div className="flex flex-col w-1/2 justify-center items-center">
          <img className="w-4/5 h-auto" src={splash}></img>
          <a className="text-gray-500" href="https://storyset.com/people">
            People illustrations by Storyset
          </a>
        </div>
        <div className="flex flex-col justify-center items-center w-1/2 bg-blue-glass/20 backdrop-blur-sm border border-blue-200 rounded-lg p-4 shadow-lg text-black">
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="text-[#aaf0c1] text-3xl font-semibold mb-3">
              LITTLE THINGS
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center items-center gap-6"
            >
              <Input
                type="email"
                id="email"
                placeholder="Email"
                className="w-80 h-10"
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
                <p className=" text-red-500 text-xs">{errors.email.message}</p>
              )}

              <Input
                type="password"
                id="password"
                placeholder="Password"
                className="w-80 h-10"
                {...register('password', {
                  required: 'Your password or email is incorrect',
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
                <p className=" text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}

              {error?.map((err, idx) => (
                <div key={idx} className="mt-1 text-red-500 text-xs">
                  {err.message}
                </div>
              ))}

              <Button
                type="submit"
                disabled={isLoading}
                className="text-[#aaf0c1] w-full h-10"
                variant="default"
              >
                Log In
              </Button>
            </form>
            <Button className="text-[#aaf0c1] w-full h-10" variant="default">
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
