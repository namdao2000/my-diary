import React from 'react';
import { lazy, ReactElement } from 'react';
import {
  BrowserRouter as Router,
  Route, Routes,
} from "react-router-dom";
import { ScrollToTop } from '../components/route/scroll-to-top';
import { routes } from '../utils/routes';

const Login = lazy(() => import('./login'));
const Home = lazy(() => import('./home'));

export const Pages = (): ReactElement => {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path={routes.login} element={<React.Suspense fallback={<>...</>}>
          <Login/>
        </React.Suspense>}/>
        <Route path={routes.home} element={<React.Suspense fallback={<>...</>}>
          <Home/>
        </React.Suspense>}/>
      </Routes>
    </Router>
  )
}