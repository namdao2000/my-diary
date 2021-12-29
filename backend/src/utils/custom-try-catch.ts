import logger from './logger';

//TODO: This is shit, we need to figure out how to catch async errors.
export const customTryCatch = (
  callback: () => void,
  next: (err: any) => void,
): void => {
  try {
    callback();
  } catch (err) {
    logger.error({
      error: err.message,
    });
    next(err);
  }
};
