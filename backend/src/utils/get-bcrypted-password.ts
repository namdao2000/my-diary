import bcrypt from 'bcrypt';

export const getBcryptedPassword = (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};
