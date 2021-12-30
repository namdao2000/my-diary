import { NextFunction, Request, Response } from 'express';
import { AuthService, Credentials } from '../services/auth.service';
import { v4 as uuidv4 } from 'uuid';
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
        res.status(401).json({
          message: 'Incorrect username or password',
        });
      } else {
        res.status(200).json({
          message: 'Login Success!',
          data: {
            token: uuidv4(),
          },
        });
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
      await AuthService.createNewUser({ ...req.body, ip: req.ip });
      res.status(201).json({
        message: `Successfully registered a new user ${req.body.username}`,
      });
    } catch (e) {
      next(e);
    }
  },
};
