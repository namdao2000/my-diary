import { SignupReqArgs } from '../controllers/auth.controller';
import { UserDataLayer, UserInfo } from '../data-layer/user.data-layer';
import { getBcryptedPassword, verifyPassword } from '../utils/bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants';
import {
  ErrorCode,
  getHttpErrorResponse,
  HttpError,
} from './http-error-response.service';

export interface Credentials {
  username: string;
  password: string;
}

export interface CreateNewUserArgs extends SignupReqArgs {
  ip: string;
}

export const AuthService = {
  verifyUserCredentials: async ({
    username,
    password,
  }: Credentials): Promise<UserInfo | undefined> => {
    const bcryptedPassword = await UserDataLayer.getUserPassword(username);
    if (!bcryptedPassword) return;
    const validPassword = await verifyPassword({ bcryptedPassword, password });
    if (validPassword) {
      const user = await UserDataLayer.getUser(username);
      if (user) {
        return {
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
        };
      }
    }
  },
  createNewUser: async ({
    username,
    password,
    first_name,
    last_name,
    ip,
  }: CreateNewUserArgs): Promise<void> => {
    if (await UserDataLayer.getUser(username)) {
      throw new HttpError(getHttpErrorResponse(ErrorCode.USERNAME_TAKEN));
    }
    const bcryptedPassword = await getBcryptedPassword(password);
    await UserDataLayer.createNewUser({
      username,
      password: bcryptedPassword,
      first_name,
      last_name,
      ip,
    });
  },
  generateJWT: async (username: string): Promise<string> => {
    return jwt.sign({ username }, JWT_SECRET(), { expiresIn: '30 days' });
  },
  verifyAndDecodeJWT: async (token: string): Promise<string | undefined> => {
    try {
      const result = jwt.verify(token, JWT_SECRET());
      return (result as { username: string }).username;
    } catch {}
  },
};
