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
import { PlaceHolderLoading } from '../components/placeholder-loading';

const Home = lazy(() => import('./home'));
const DiaryFeed = lazy(() => import('./diary-feed'));
const Diary = lazy(() => import('./diary'));
const PublicDiary = lazy(() => import('./public-diary'));
const PublicDiaryFeed = lazy(() => import('./public-diary-feed'));

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
                <React.Suspense
                  fallback={<PlaceHolderLoading className="h-2 w-72" />}
                >
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
                  <React.Suspense
                    fallback={<PlaceHolderLoading className="h-2 w-72" />}
                  >
                    <DiaryFeed />
                  </React.Suspense>
                </AuthGuard>
              }
            />
            <Route
              path={ROUTES.publicDiaryFeed}
              element={
                <React.Suspense
                  fallback={<PlaceHolderLoading className="h-2 w-72" />}
                >
                  <PublicDiaryFeed />
                </React.Suspense>
              }
            />
            <Route
              path={ROUTES.diaryPage}
              element={
                <AuthGuard>
                  <React.Suspense
                    fallback={<PlaceHolderLoading className="h-2 w-72" />}
                  >
                    <Diary />
                  </React.Suspense>
                </AuthGuard>
              }
            />
            <Route
              path={ROUTES.publicDiaryPage}
              element={
                <React.Suspense
                  fallback={<PlaceHolderLoading className="h-2 w-72" />}
                >
                  <PublicDiary />
                </React.Suspense>
              }
            />
          </Routes>
        </PageLayout>
      </Router>
    </div>
  );
};
