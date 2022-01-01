import { useAuthState } from './auth-state-provider';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

export const useLogout = (): (() => void) => {
  const { setUserLoggedOut } = useAuthState();
  const navigate = useNavigate();

  return useCallback(() => {
    setUserLoggedOut();
    navigate(ROUTES.login, { replace: true });
  }, [setUserLoggedOut, navigate]);
};
