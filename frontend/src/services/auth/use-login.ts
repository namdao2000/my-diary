import { useCallback, useState } from 'react';
import { Credentials } from '../../types/credentials';
import { useAuthState } from './auth-state-provider';
import { toast } from 'react-hot-toast';

export const useLogin = (): {
  login: ({
    credentials,
    onSuccess,
  }: {
    credentials: Credentials;
    onSuccess: () => void;
  }) => Promise<void>;
  loading: boolean;
} => {
  const [loading, setLoading] = useState(false);

  const { isLoggedIn, setUserLoggedIn } = useAuthState();

  const login = useCallback(
    async ({ credentials, onSuccess }): Promise<void> => {
      setLoading(true);
      // TODO: Reach out to AXIOS, see if the username and password is correct.
      //  If false, show a toaster. If true, call the onSuccess and place the user into the local storage.
      setLoading(false);
      onSuccess();
    },
    [],
  );

  return {
    login: verifyUserCredentials,
    loading,
  };
};
