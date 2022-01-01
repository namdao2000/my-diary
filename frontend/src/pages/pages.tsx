import React from 'react';
import { lazy, ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from '../components/route/scroll-to-top';
import { ROUTES } from '../utils/routes';
import { Navbar } from '../components/navbar';
import { AuthGuard } from '../services/auth/auth-guard';
import Signup from './signup';
import Login from './login';
import ForgotPassword from './forgot-password';
import { Page404 } from './404';
import { PageLayout } from '../components/page-layout';

const Home = lazy(() => import('./home'));
const DiaryFeed = lazy(() => import('./diary-feed'));
const Diary = lazy(() => import('./diary'));

export const Pages = (): ReactElement => {
  return (
    <div className="h-screen w-screen">
      {/*{process.env.NODE_ENV === 'development' && <NamToolBar />}*/}
      {/*Main content */}
      <Router>
        <Navbar />
        <ScrollToTop />

        <PageLayout>
          <Routes>
            <Route
              path={ROUTES.home}
              element={
                <React.Suspense fallback={<>...</>}>
                  <Home />
                </React.Suspense>
              }
            />
            <Route path={ROUTES.login} element={<Login />} />
            <Route path={ROUTES.signup} element={<Signup />} />
            <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
            <Route path={ROUTES.page404} element={<Page404 />} />
            <Route
              path={ROUTES.diaryFeed}
              element={
                <AuthGuard>
                  <React.Suspense fallback={<>...</>}>
                    <DiaryFeed />
                  </React.Suspense>
                </AuthGuard>
              }
            />
            <Route
              path={ROUTES.diary}
              element={
                <AuthGuard>
                  <React.Suspense fallback={<>...</>}>
                    <Diary />
                  </React.Suspense>
                </AuthGuard>
              }
            />
          </Routes>
        </PageLayout>
      </Router>
    </div>
  );
};
