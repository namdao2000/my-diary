import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
import { ErrorCode, getHttpErrorResponse } from '../services/http-error-response.service';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!error.status) {
    logger.error({
      message: 'Unknown error occurred, but was caught',
      stack_trace: error.stack,
    });
    res.status(500).json(getHttpErrorResponse(ErrorCode.UNKNOWN_ERROR));
  } else {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
      errors: error.errors,
      error_code: error.error_code,
    });
  }
  next();
};
