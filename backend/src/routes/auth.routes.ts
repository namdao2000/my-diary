import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { body } from 'express-validator';
import { validateResult } from '../middleware/validate-result.middleware';

export const AuthRouter = Router();
AuthRouter.post(
  '/login',
  body('username').exists().withMessage('Username is required'),
  body('password').exists().withMessage('required'),
  validateResult,
  AuthController.login,
);
AuthRouter.post(
  '/signup',
  body('username')
    .exists()
    .withMessage('required')
    .isLength({ min: 3, max: 14 })
    .withMessage('Must be between 3 to 14 characters long.'),
  body('password')
    .exists()
    .withMessage('required')
    .isLength({ min: 8, max: 255 })
    .withMessage('Must be between 8 to 255 characters long.'),
  body('first_name')
    .exists()
    .withMessage('required')
    .isLength({ max: 255 })
    .withMessage('Must be less than 255 characters long.'),
  body('last_name')
    .exists()
    .withMessage('required')
    .isLength({ max: 255 })
    .withMessage('Must be less than 255 characters long.'),
  validateResult,
  AuthController.signup,
);
