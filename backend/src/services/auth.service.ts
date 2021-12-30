import { SignupReqArgs } from '../controllers/auth.controller';
import { UserDataLayer } from '../data-layer/user.data-layer';
import { getBcryptedPassword, verifyPassword } from '../utils/bcrypt';

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
  }: Credentials): Promise<boolean> => {
    const bcryptedPassword = await UserDataLayer.getUserPassword(username);
    if (!bcryptedPassword) return false;
    return verifyPassword({ bcryptedPassword, password });
  },
  createNewUser: async ({
    username,
    password,
    first_name,
    last_name,
    ip,
  }: CreateNewUserArgs): Promise<void> => {
    const bcryptedPassword = await getBcryptedPassword(password);
    await UserDataLayer.createNewUser({
      username,
      password: bcryptedPassword,
      first_name,
      last_name,
      ip,
    });
  },
};
