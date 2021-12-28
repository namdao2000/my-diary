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
  setUserloggedOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  setUserLoggedIn: () => {
    throw new Error('AuthProvider is required');
  },
  setUserloggedOut: () => {
    throw new Error('AuthProvider is required');
  },
});

export const useAuth = (): IAuthContext => useContext(AuthContext);

export const AuthProvider = ({
  authStorageService,
  children,
}: {
  authStorageService: AuthStorageService;
  children: ReactNode;
}): ReactElement => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const [user, setUser] = useState<User | undefined>(undefined);

  const setUserloggedOut = useCallback((): void => {
    setUser(undefined);
    setLoggedIn(false);
    authStorageService.clear();
  }, [authStorageService]);

  const setUserLoggedIn = useCallback(
    (user: User, token: string): void => {
      authStorageService.setAccessToken(token);
      authStorageService.setUserInfo(user);
      setUser(user);
      setLoggedIn(true);
    },
    [authStorageService],
  );

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, setUserLoggedIn, setUserloggedOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
