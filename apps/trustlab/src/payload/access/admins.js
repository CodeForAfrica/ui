import { checkRole } from "./checkRole";
import { ROLE_ADMIN } from "./roles";

export const admins = (user) => checkRole([ROLE_ADMIN], user);

export const adminsOrSelf = (user) => {
  if (!user) return false;
  const isAdmin = checkRole([ROLE_ADMIN], user);
  return (
    isAdmin || {
      id: {
        equals: user.id,
      },
    }
  );
};
