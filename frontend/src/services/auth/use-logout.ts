import { useAuthState } from './auth-state-provider';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';

export const useLogout = (): (() => void) => {
  const { setUserLoggedOut } = useAuthState();
  const navigate = useNavigate();

  return useCallback(() => {
    setUserLoggedOut();
    navigate(routes.login, { replace: true });
  }, [setUserLoggedOut, navigate]);
};
