import { ReactElement, ReactNode } from 'react';
import { useAuthState } from './auth-state-provider';
import { Navigate, useLocation } from 'react-router-dom';

export const AuthGuard = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const auth = useAuthState();
  let location = useLocation().pathname;

  if (!auth.isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};
