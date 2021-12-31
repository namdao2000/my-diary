import { ReactElement, useMemo } from 'react';
import { LoginArgs, useLogin } from '../services/auth/use-login';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = (): ReactElement => {
  const { login, loading } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location as any)?.state?.from || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    username: string;
    password: string;
  }>();

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (loginArgs: LoginArgs) => {
        await login({
          loginArgs,
          onSuccess: () => {
            toast.success('Login Successful');
            navigate(from, { replace: true });
          },
        });
      }),
    [handleSubmit, login],
  );

  return (
    <div className="flex justify-center">
      <form className="p-6 w-96" onSubmit={onSubmit}>
        <div className="mb-3">
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

export default Login;
