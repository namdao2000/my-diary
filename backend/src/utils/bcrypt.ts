import bcrypt from 'bcrypt';

export const getBcryptedPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = async ({
  bcryptedPassword,
  password,
}: {
  bcryptedPassword: string;
  password: string;
}): Promise<boolean> => {
  return bcrypt.compare(password, bcryptedPassword);
};
