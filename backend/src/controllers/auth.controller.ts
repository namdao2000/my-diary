import { NextFunction, Request, Response } from 'express';
import { AuthService, Credentials } from '../services/auth.service';
import { ErrorCode, getHttpErrorResponse } from '../services/http-error-response.service';

export interface SignupReqArgs {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface LoginReqArgs extends Credentials {}

export const AuthController = {
  login: async (
    req: Request<{}, {}, LoginReqArgs>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const response = await AuthService.verifyUserCredentials(req.body);
      if (!response) {
        next(getHttpErrorResponse(ErrorCode.INVALID_CREDENTIALS));
      } else {
        const token = await AuthService.generateJWT(req.body.username);
        res.status(200).json({
          message: 'Login Success!',
          token,
        });
        next();
      }
    } catch (e) {
      next(e);
    }
  },
  signup: async (
    req: Request<{}, {}, SignupReqArgs>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await AuthService.createNewUser({
        ...req.body,
        ip: req.ip,
      });
      const token = await AuthService.generateJWT(req.body.username);
      res.status(201).json({
        message: `Successfully registered a new user ${req.body.username}.`,
        token,
      });
      next();
    } catch (e) {
      next(e);
    }
  },
};
