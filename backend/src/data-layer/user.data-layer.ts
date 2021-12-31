import { DB } from '../helpers/database.helper';
import { SQL_STATEMENTS } from './sql-statements';
import { CreateNewUserArgs } from '../services/auth.service';

export interface UserSchema {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  ip_address: string;
  created_at: string;
  updated_at: string;
}

export interface UserInfo {
  username: string;
  first_name: string;
  last_name: string;
}

export const UserDataLayer = {
  createNewUser: async ({
    username,
    password,
    first_name,
    last_name,
    ip,
  }: CreateNewUserArgs): Promise<void> => {
    await (
      await DB
    ).all(SQL_STATEMENTS.createUser, [username, password, first_name, last_name, ip]);
  },
  getUserPassword: async (username: string): Promise<string | undefined> => {
    const res = await (await DB).get(SQL_STATEMENTS.getUserPassword, [username]);
    return res?.password;
  },
  getUser: async (username: string): Promise<UserSchema | undefined> => {
    return await (await DB).get(SQL_STATEMENTS.getUser, [username]);
  },
};
