import { useCallback, useState } from 'react';
import { useAuthState } from './auth-state-provider';
import { requestWithJWT } from '../axios/axios.wrapper';
import { LoginArgs } from './use-login';
import { APP_URL } from '../../utils/constants';

export interface SignupArgs extends LoginArgs {
  first_name: string;
  last_name: string;
}

export const useSignup = (): {
  signup: ({
    signupArgs,
    onSuccess,
  }: {
    signupArgs: SignupArgs;
    onSuccess: () => void;
  }) => Promise<void>;
  loading: boolean;
} => {
  const [loading, setLoading] = useState(false);

  const { setUserLoggedIn } = useAuthState();

  const signup = useCallback(
    async ({ signupArgs, onSuccess }): Promise<void> => {
      setLoading(true);
      const response = await requestWithJWT(
        'post',
        `${APP_URL}/signup`,
        signupArgs,
      );
      if (response) {
        setUserLoggedIn(response.data.user, response.data.token);
        onSuccess();
      }
      setLoading(false);
    },
    [],
  );

  return {
    signup,
    loading,
  };
};
