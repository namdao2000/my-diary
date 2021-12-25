import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../utils/routes';

const Home = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center">
      <p>
        This is the home page! Welcome aboard soldier :-)
      </p>
      {/*<button*/}
      {/*  onClick={() => navigate(routes.login)}*/}
      {/*>*/}
      {/*  go to login!*/}
      {/*</button>*/}
    </div>
  )
};

export default Home;