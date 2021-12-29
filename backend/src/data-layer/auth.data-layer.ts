import { SignupReqArgs } from '../controllers/auth.controller';
import { DB } from '../helpers/db-wrapper.helper';
import { SQL_STATEMENTS } from './sql-statements';
import { getBcryptedPassword } from '../utils/get-bcrypted-password';

export const AuthDataLayer = {
  createNewUser: async ({
    username,
    password,
    first_name,
    last_name,
  }: SignupReqArgs): Promise<string> => {
    const bcryptedPassword = getBcryptedPassword(password);
    throw new Error('please catch me lmao');
    const res = DB.run(SQL_STATEMENTS.createNewUser, [
      username,
      bcryptedPassword,
      first_name,
      last_name,
      '0.0.0.0',
    ]);
    return username;
  },
};
