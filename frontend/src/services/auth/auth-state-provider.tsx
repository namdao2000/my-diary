import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { UserInfo } from '../../types/user-Info';
import { AuthStorageService } from './auth-storage.service';

interface IAuthContext {
  isLoggedIn: boolean;
  user?: UserInfo;
  setUserLoggedIn: (user: UserInfo, token: string) => void;
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
  const [isLoggedIn, setLoggedIn] = useState<boolean>(
    !!AuthStorageService.getAccessToken(),
  );

  const [user, setUser] = useState<UserInfo | undefined>(
    AuthStorageService.getUserInfo(),
  );

  const setUserloggedOut = useCallback((): void => {
    setUser(undefined);
    setLoggedIn(false);
    AuthStorageService.clear();
  }, [AuthStorageService]);

  const setUserLoggedIn = useCallback(
    (user: UserInfo, token: string): void => {
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
