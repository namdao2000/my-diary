import { NextFunction, Request, Response } from 'express';
import { ErrorCode, getHttpErrorResponse } from '../services/http-error-response.service';
import { AuthService } from '../services/auth.service';

export const authTokenGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  if (!authHeader?.startsWith('Bearer')) {
    next(getHttpErrorResponse(ErrorCode.MISSING_AUTH_TOKEN));
  } else {
    const authHeaderArray = authHeader.split(' ');
    const token = authHeaderArray?.[1];
    const decodedToken = await AuthService.verifyAndDecodeJWT(token);
    if (!decodedToken) {
      next(getHttpErrorResponse(ErrorCode.INVALID_TOKEN));
    } else {
      res.locals.username = decodedToken;
      next();
    }
  }
};
