import bcrypt from 'bcrypt';

export const getBcryptedPassword = async (
  password: string,
): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
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
