import { useCallback, useState } from 'react';
import { useAuthState } from './auth-state-provider';
import { requestWithJWT } from '../axios/axios.wrapper';
import { APP_URL } from '../../utils/constants';

export interface LoginArgs {
  username: string;
  password: string;
}

export const useLogin = (): {
  login: ({
    loginArgs,
    onSuccess,
  }: {
    loginArgs: LoginArgs;
    onSuccess: () => void;
  }) => Promise<void>;
  loading: boolean;
} => {
  const [loading, setLoading] = useState(false);

  const { setUserLoggedIn } = useAuthState();

  const login = useCallback(async ({ loginArgs, onSuccess }): Promise<void> => {
    setLoading(true);
    const response = await requestWithJWT(
      'post',
      `${APP_URL}/login`,
      loginArgs,
    );
    if (response) {
      setUserLoggedIn(response.data.user, response.data.token);
      onSuccess();
    }
    setLoading(false);
  }, []);

  return {
    login,
    loading,
  };
};
