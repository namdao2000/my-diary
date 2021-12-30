export enum ErrorCode {
  MISSING_AUTH_TOKEN = 'MISSING_AUTH_TOKEN',
  INVALID_TOKEN = 'INVALID_TOKEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  USERNAME_TAKEN = 'USERNAME_TAKEN',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface HttpErrorResponse {
  status: number;
  message: string;
  error_code: ErrorCode;
}

export const getHttpErrorResponse = (errorCode: ErrorCode): HttpErrorResponse => {
  let response: HttpErrorResponse = {
    status: 400,
    message: errorCode,
    error_code: errorCode,
  };
  switch (errorCode) {
    case ErrorCode.INVALID_CREDENTIALS: {
      response.status = 401;
      response.message = 'Your username or password is invalid';
      break;
    }
    case ErrorCode.INVALID_TOKEN: {
      response.status = 401;
      response.message = 'Your Auth token is invalid.';
      break;
    }
    case ErrorCode.MISSING_AUTH_TOKEN: {
      response.status = 401;
      response.message = `Your header is missing 'Bearer (Token)'`;
      break;
    }
    case ErrorCode.USERNAME_TAKEN: {
      response.status = 409;
      response.message =
        'New account cannot be created because the username provided has been taken.';
      break;
    }
    case ErrorCode.UNKNOWN_ERROR: {
      response.status = 500;
      response.message =
        'An unknown error has occurred while processing your request. Please try again later.';
      break;
    }
  }

  return response;
};
