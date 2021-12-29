import { User } from '../../types/user';

export interface IAuthStorageService {
  getUserInfo(): User | undefined;

  setUserInfo(userInfo: User): void;

  getAccessToken(): string | undefined;

  setAccessToken(accessToken: string): void;

  clear(): void;
}

const UserKey = 'my_diary_user';
const TokenKey = 'my_diary_access_token';

const setValue = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

const getValue = (key: string): string | undefined => {
  return localStorage.getItem(key) ?? undefined;
};

const clearValue = (key: string): void => {
  localStorage.removeItem(key);
};

export const AuthStorageService: IAuthStorageService = {
  getUserInfo(): User | undefined {
    const token = this.getAccessToken();
    if (!token) {
      return undefined;
    }
    const value = getValue(UserKey);
    if (value === undefined) {
      return value;
    }
    return JSON.parse(value);
  },
  setUserInfo(userInfo: User): void {
    setValue(UserKey, JSON.stringify(userInfo));
  },
  getAccessToken(): string | undefined {
    return getValue(TokenKey);
  },
  setAccessToken(accessToken: string): void {
    setValue(TokenKey, accessToken);
  },
  clear(): void {
    clearValue(TokenKey);
    clearValue(UserKey);
  },
};
