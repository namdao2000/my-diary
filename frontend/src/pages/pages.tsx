import React from 'react';
import { lazy, ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from '../components/route/scroll-to-top';
import { routes } from '../utils/routes';
import { Navbar } from '../components/navbar';
import { AuthGuard } from '../services/auth/auth-guard';
import { NamToolBar } from '../components/nam-tool-bar';
import Signup from './signup';
import Login from './login';
import ForgotPassword from './forgot-password';

const Home = lazy(() => import('./home'));
const DiaryFeed = lazy(() => import('./diary-feed'));
const Diary = lazy(() => import('./diary'));

export const Pages = (): ReactElement => {
  return (
    <div className="h-screen w-screen">
      {process.env.NODE_ENV === 'development' && <NamToolBar />}
      {/*Main content */}
      <Router>
        <Navbar />
        <ScrollToTop />

        <div className="pt-4 px-6 md:px-16 h-full">
          <Routes>
            <Route
              path={routes.home}
              element={
                <React.Suspense fallback={<>...</>}>
                  <Home />
                </React.Suspense>
              }
            />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.signup} element={<Signup />} />
            <Route path={routes.forgotPassword} element={<ForgotPassword />} />
            <Route
              path={routes.diaryFeed}
              element={
                <AuthGuard>
                  <React.Suspense fallback={<>...</>}>
                    <DiaryFeed />
                  </React.Suspense>
                </AuthGuard>
              }
            />
            <Route
              path={routes.diary}
              element={
                <AuthGuard>
                  <React.Suspense fallback={<>...</>}>
                    <Diary />
                  </React.Suspense>
                </AuthGuard>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
};
