import React from 'react';
import { lazy, ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from '../components/route/scroll-to-top';
import { routes } from '../utils/routes';
import { Navbar } from '../components/navbar';
import { AuthGuard } from '../services/auth/auth-guard';
import { NamToolBar } from '../components/nam-tool-bar';

const Login = lazy(() => import('./login'));
const Home = lazy(() => import('./home'));
const Signup = lazy(() => import('./signup'));
const ForgotPassword = lazy(() => import('./forgot-password'));
const Diary = lazy(() => import('./diary'));

export const Pages = (): ReactElement => {
  return (
    <div className="h-screen w-screen">
      {process.env.NODE_ENV === 'development' && <NamToolBar />}
      {/*Main content */}
      <Router>
        <Navbar />
        <ScrollToTop />

        <div className="pt-4 px-16">
          <Routes>
            <Route
              path={routes.home}
              element={
                <React.Suspense fallback={<>...</>}>
                  <Home />
                </React.Suspense>
              }
            />
            <Route
              path={routes.login}
              element={
                <React.Suspense fallback={<>...</>}>
                  <Login />
                </React.Suspense>
              }
            />
            <Route
              path={routes.signup}
              element={
                <React.Suspense fallback={<>...</>}>
                  <Signup />
                </React.Suspense>
              }
            />
            <Route
              path={routes.forgotPassword}
              element={
                <React.Suspense fallback={<>...</>}>
                  <ForgotPassword />
                </React.Suspense>
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
