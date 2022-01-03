import { ReactElement, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { SignupArgs, useSignup } from '../services/auth/use-signup';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import { useDiary } from '../services/diary/use-diary';
import clsx from 'clsx';

const Signup = (): ReactElement => {
  const { signup, loading } = useSignup();
  const navigate = useNavigate();
  const { createDiaryPage } = useDiary();

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
          onSuccess: async () => {
            toast.success('Singup Successful');
            const page_id = await createDiaryPage({
              title: 'New Page Title',
              content: '',
            });
            navigate(`${ROUTES.diaryFeed}/${page_id}`, { replace: true });
          },
        });
      }),
    [handleSubmit, signup],
  );

  return (
    <div className="flex justify-center">
      <form className="p-6 w-96" onSubmit={onSubmit}>
        <div className="mb-10">
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
              {...register('username', {
                required: 'username is required',
                minLength: {
                  value: 3,
                  message: 'Too short!',
                },
                maxLength: {
                  value: 14,
                  message: 'Too long!',
                },
              })}
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
              {...register('password', {
                required: 'password is required',
                minLength: {
                  value: 8,
                  message: 'Password needs 8 characters or more',
                },
              })}
              type="password"
              name="password"
            />
            {!!errors?.password?.message && (
              <p className="mt-2 text-red-600">{errors?.password?.message}</p>
            )}
          </div>
        </div>
        <button
          className={clsx(
            'bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded w-full',
            { 'animate-pulse': loading },
          )}
          type="submit"
          disabled={loading}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
