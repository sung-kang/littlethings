import { useForm } from 'react-hook-form';
import useAuthContext from '@/hooks/useAuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import splash from '/Learning-bro.svg';
import { useNavigate } from 'react-router-dom';

type RegisterFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { error, isLoading, registerUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormFields>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormFields) => {
    const { firstName, lastName, email, password, confirmPassword } = data;

    try {
      await registerUser(firstName, lastName, email, password, confirmPassword);
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
                type="text"
                id="firstName"
                placeholder="First Name"
                className="w-80 h-10"
                {...register('firstName', {
                  required: 'Please enter a valid first name',
                  maxLength: {
                    value: 255,
                    message: 'First name must be no more than 255 characters',
                  },
                })}
              />
              {errors.firstName && (
                <p className=" text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}

              <Input
                type="text"
                id="lastName"
                placeholder="Last Name"
                className="w-80 h-10"
                {...register('lastName', {
                  required: 'Please enter a valid last name',
                  maxLength: {
                    value: 255,
                    message: 'Last name must be no more than 255 characters',
                  },
                })}
              />
              {errors.lastName && (
                <p className=" text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}

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
                <p className=" text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}

              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="w-80 h-10"
                {...register('confirmPassword', {
                  required: 'Please enter your password',
                  validate: (val) => {
                    if (watch('password') !== val) {
                      return 'Your passwords do not match';
                    }
                  },
                })}
              />
              {errors.confirmPassword && (
                <p className=" text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}

              {/* {error?.map((err, idx) => (
                <div key={idx} className="mt-1 text-red-500 text-xs">
                  {err.message}
                </div>
              ))} */}

              <Button
                type="submit"
                disabled={isLoading}
                className="text-[#aaf0c1] w-full h-10"
                variant="default"
              >
                Create Account
              </Button>
            </form>
            <Button
              className="text-[#aaf0c1] w-full h-10"
              variant="default"
              onClick={() => navigate('/')}
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
