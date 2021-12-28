import { ReactElement } from 'react';

const Login = (): ReactElement => {
  const handleSubmit = () => {};

  return (
    <div className="flex justify-center">
      <form className="p-6 w-96" onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="mb-4">
            <div className="mb-2">
              <label>Email</label>
            </div>
            <input
              className="appearance-none border-2 rounded-lg w-full p-3 text-black focus:outline-none"
              required
              autoFocus
              type="email"
              name="email"
            />
          </div>
          <div className="mb-5">
            <div className="mb-2">
              <label>Password</label>
            </div>
            <input
              className="appearance-none border-2 rounded-lg w-full p-3 text-black focus:outline-none"
              required
              type="password"
              name="password"
            />
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
