import bcrypt from 'bcrypt';

export const getBcryptedPassword = async (
  password: string,
): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};
