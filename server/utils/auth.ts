import { type User } from "@prisma/client";

export const sanitizeUser = (user: User) => {
  if (!user) return null;

  //@ts-ignore
  delete user.password;
  return user;
};
