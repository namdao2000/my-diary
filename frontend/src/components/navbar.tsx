import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../utils/routes';

export const Navbar = (): ReactElement => {
  return (
    <div className="bg-teal-500 px-10">
      <nav className="flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            📔 My Diary
          </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link
              to={routes.home}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Home
            </Link>
            <Link
              to={routes.diary}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Diary
            </Link>
          </div>
          <div>
            <Link
              to={routes.login}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
