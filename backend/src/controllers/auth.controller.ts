import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export interface SignupReqArgs {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}

export const AuthController = {
  login: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    // TODO:
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
