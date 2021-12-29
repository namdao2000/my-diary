import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export const AuthRouter = Router();
AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/signup', AuthController.signup);
