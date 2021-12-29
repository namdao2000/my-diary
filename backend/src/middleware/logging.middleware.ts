import { Request, Response } from 'express';
import logger from '../utils/logger';

export const logging = (req: Request, res: Response): void => {
  logger.info({
    message: 'Request received',
    request_type: req.method,
    request_url: req.url,
    response_status: res.statusCode, // this only works once you've intercepted the res function.
  });
};
