import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ErrorCode } from '../services/http-error-response.service';

export const validateResult = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({
      status: 400,
      message: 'Bad request. Please check your input and try again.',
      errors: errors.array(),
      error_code: ErrorCode.BAD_REQUEST,
    });
  } else {
    next();
  }
};
