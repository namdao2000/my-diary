import { SignupReqArgs } from '../controllers/auth.controller';
import { DB } from '../helpers/database.helper';
import { SQL_STATEMENTS } from './sql-statements';
import { getBcryptedPassword } from '../utils/get-bcrypted-password';

export const AuthDataLayer = {
  createNewUser: async ({
    username,
    password,
    first_name,
    last_name,
  }: SignupReqArgs): Promise<string> => {
    const bcryptedPassword = await getBcryptedPassword(password);
    (await DB).all(SQL_STATEMENTS.createNewUser, [
      username,
      bcryptedPassword,
      first_name,
      last_name,
      '0.0.0.0',
    ]);
    return username;
  },
};
