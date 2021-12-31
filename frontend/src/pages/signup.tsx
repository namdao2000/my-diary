import { ReactElement, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { SignupArgs, useSignup } from '../services/auth/use-signup';
import { useLocation, useNavigate } from 'react-router-dom';

const Signup = (): ReactElement => {
  const { signup, loading } = useSignup();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location as any)?.state?.from || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    first_name: string;
    last_name: string;
    username: string;
    password: string;
  }>();

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (signupArgs: SignupArgs) => {
        await signup({
          signupArgs: signupArgs,
          onSuccess: () => {
            toast.success('Singup Successful');
            navigate(from, { replace: true });
          },
        });
      }),
    [handleSubmit, signup],
  );

  return (
    <div className="flex justify-center">
      <form className="p-6 w-96" onSubmit={onSubmit}>
        <div className="mb-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-4">
            <div>
              <div className="mb-2">
                <label>First Name</label>
              </div>
              <input
                className="appearance-none border-2 rounded-lg w-full p-3 text-black focus:outline-none"
                {...register('first_name', {
                  required: 'first name is required',
                })}
                autoFocus
                type="first_name"
                name="first_name"
              />
              {!!errors?.first_name?.message && (
                <p className="mt-2 text-red-600">
                  {errors?.first_name?.message}
                </p>
              )}
            </div>
            <div>
              <div className="mb-2">
                <label>Last Name</label>
              </div>
              <input
                className="appearance-none border-2 rounded-lg w-full p-3 text-black focus:outline-none"
                {...register('last_name', {
                  required: 'last name is required',
                })}
                autoFocus
                type="last_name"
                name="last_name"
              />
              {!!errors?.last_name?.message && (
                <p className="mt-2 text-red-600">
                  {errors?.last_name?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-2">
              <label>Username</label>
            </div>
            <input
              className="appearance-none border-2 rounded-lg w-full p-3 text-black focus:outline-none"
              {...register('username', { required: 'username is required' })}
              autoFocus
              type="username"
              name="username"
            />
            {!!errors?.username?.message && (
              <p className="mt-2 text-red-600">{errors?.username?.message}</p>
            )}
          </div>
          <div className="mb-5">
            <div className="mb-2">
              <label>Password</label>
            </div>
            <input
              className="appearance-none border-2 rounded-lg w-full p-3 text-black focus:outline-none"
              {...register('password', { required: 'password is required' })}
              type="password"
              name="password"
            />
            {!!errors?.password?.message && (
              <p className="mt-2 text-red-600">{errors?.password?.message}</p>
            )}
          </div>
        </div>
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded w-full"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
