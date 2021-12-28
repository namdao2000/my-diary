import { useCallback, useState } from 'react';

type Credentials = {
  username: string;
  password: string;
};

export const useLogin = (): {
  login: (credentials: Credentials) => Promise<void>;
  loading: boolean;
} => {
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (credentials: Credentials) => {
    // TODO
  }, []);

  return {
    login,
    loading,
  };
};
