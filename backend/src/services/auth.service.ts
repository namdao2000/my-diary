import { SignupReqArgs } from '../controllers/auth.controller';
import { AuthDataLayer } from '../data-layer/auth.data-layer';

export const AuthService = {
  verifyUserCredentials: () => {},
  createNewUser: async (signupRequestArgs: SignupReqArgs): Promise<void> => {
    await AuthDataLayer.createNewUser(signupRequestArgs);
  },
};
