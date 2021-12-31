import { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../utils/routes';
import { useAuthState } from '../services/auth/auth-state-provider';
import { useLogout } from '../services/auth/use-logout';

export const Navbar = (): ReactElement => {
  const location = { from: useLocation().pathname };
  const { isLoggedIn, user } = useAuthState();
  const logout = useLogout();

  // If the user navigates from login or signup, do not save the state.
  if (location.from === routes.signup || location.from === routes.login) {
    location.from = '/';
  }

  return (
    <div className="bg-teal-500">
      <nav className="flex items-center justify-between flex-wrap px-6 md:px-16 py-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            📔 My Diary
          </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link
              to={routes.home}
              state={location}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Home
            </Link>
            <Link
              to={routes.diaryFeed}
              state={location}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Feed
            </Link>
          </div>
          {!isLoggedIn && (
            <>
              <div>
                <Link
                  to={routes.login}
                  state={location}
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mr-4"
                >
                  Login
                </Link>
              </div>
              <div>
                <Link
                  to={routes.signup}
                  state={location}
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                >
                  Signup
                </Link>
              </div>
            </>
          )}
          {isLoggedIn && (
            <div className="flex items-center flex-shrink-0">
              <p className="text-white mr-4">Welcome, {user?.first_name}!</p>
              <button
                onClick={logout}
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
