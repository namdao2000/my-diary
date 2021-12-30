import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error({
    message: 'Error has occurred, but was caught',
    error,
  });
  res.status(400).send();
  next();
};
