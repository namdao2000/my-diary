export const BASE_URL = '/my-diary/v1';
export const DB_LOCATION = process.env.DB_FILE || './database.db';
export const JWT_SECRET = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('Missing JWT secret');
  return secret;
};
export const NODE_ENV = process.env.NODE_ENV || 'DEVELOPMENT';
