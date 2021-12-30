import { DB } from '../helpers/database.helper';
import { SQL_STATEMENTS } from './sql-statements';
import { getBcryptedPassword } from '../utils/get-bcrypted-password';
import { CreateNewUserArgs } from '../services/auth.service';

export const AuthDataLayer = {
  createNewUser: async ({
    username,
    password,
    first_name,
    last_name,
    ip,
  }: CreateNewUserArgs): Promise<string> => {
    const bcryptedPassword = await getBcryptedPassword(password);
    await (
      await DB
    ).all(SQL_STATEMENTS.createNewUser, [
      username,
      bcryptedPassword,
      first_name,
      last_name,
      ip,
    ]);
    return username;
  },
};
