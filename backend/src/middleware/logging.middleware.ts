import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';

export const logging = (req: Request, res: Response, next: NextFunction): void => {
  logger.info({
    message: 'Http Request',
    request_type: req.method,
    request_url: req.url,
    request_ip: req.headers['x-forwarded-for'],
  });
  next();
};
