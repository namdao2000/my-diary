import { SignupReqArgs } from '../controllers/auth.controller';
import { AuthDataLayer } from '../data-layer/auth.data-layer';

export interface CreateNewUserArgs extends SignupReqArgs {
  ip: string;
}

export const AuthService = {
  verifyUserCredentials: () => {},
  createNewUser: async (
    createNewUserArgs: CreateNewUserArgs,
  ): Promise<void> => {
    await AuthDataLayer.createNewUser(createNewUserArgs);
  },
};
