type hashPasswordProps = {
  password: string;
  salt?: number;
};

export const hashPassword = async ({
  password,
}: hashPasswordProps): Promise<string> => {
  return await Bun.password.hash(password);
};
