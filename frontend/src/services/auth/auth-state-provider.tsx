import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { User } from '../../types/user';
import { AuthStorageService } from './auth-storage.service';

interface IAuthContext {
  isLoggedIn: boolean;
  user?: User;
  setUserLoggedIn: (user: User, token: string) => void;
  setUserLoggedOut: () => void;
}

export const AuthStateContext = createContext<IAuthContext>({
  isLoggedIn: false,
  setUserLoggedIn: () => {
    throw new Error('AuthProvider is required');
  },
  setUserLoggedOut: () => {
    throw new Error('AuthProvider is required');
  },
});

export const useAuthState = (): IAuthContext => useContext(AuthStateContext);

export const AuthStateProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const [user, setUser] = useState<User | undefined>(undefined);

  const setUserloggedOut = useCallback((): void => {
    setUser(undefined);
    setLoggedIn(false);
    AuthStorageService.clear();
  }, [AuthStorageService]);

  const setUserLoggedIn = useCallback(
    (user: User, token: string): void => {
      AuthStorageService.setAccessToken(token);
      AuthStorageService.setUserInfo(user);
      setUser(user);
      setLoggedIn(true);
    },
    [AuthStorageService],
  );

  return (
    <AuthStateContext.Provider
      value={{
        isLoggedIn,
        user,
        setUserLoggedIn,
        setUserLoggedOut: setUserloggedOut,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};
