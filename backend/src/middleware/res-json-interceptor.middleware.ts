import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export const resJsonInterceptor = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let oldResJson = res.json;
  res.json = (data) => {
    // TODO: here
    logger.info({
      http_response: data,
    });
    res.json = oldResJson;
    return res.json(data);
  };
  next();
};
