import { DB } from '../helpers/database.helper';
import { SQL_STATEMENTS } from './sql-statements';
import { CreateNewUserArgs } from '../services/auth.service';

export const UserDataLayer = {
  createNewUser: async ({
    username,
    password,
    first_name,
    last_name,
    ip,
  }: CreateNewUserArgs): Promise<string> => {
    await (
      await DB
    ).all(SQL_STATEMENTS.createNewUser, [
      username,
      password,
      first_name,
      last_name,
      ip,
    ]);
    return username;
  },
  getUserPassword: async (username: string): Promise<string | undefined> => {
    const res = await (
      await DB
    ).get(SQL_STATEMENTS.getUserPassword, [username]);
    return res?.password;
  },
};
