import { checkRole } from "./checkRole";
import { ROLE_ADMIN, ROLE_AUTHOR, ROLE_DEFAULT, ROLE_EDITOR } from "./roles";

export const canManageContent = (user) => {
  if (!user) return false;
  const isAdmin = checkRole([ROLE_ADMIN], user);
  if (isAdmin) return true;

  const isAuthor = checkRole([ROLE_EDITOR], user);
  if (isAuthor)
    return {
      or: [
        {
          createdBy: {
            equals: user.id,
          },
        },
        {
          "createdBy.role": {
            in: [ROLE_EDITOR, ROLE_AUTHOR],
          },
        },
      ],
    };
  return {
    createdBy: {
      equals: user.id,
    },
  };
};

export const canManagePages = (user) =>
  checkRole([ROLE_ADMIN, ROLE_EDITOR], user);

export const canManageSiteSettings = (user) => checkRole([ROLE_ADMIN], user);

export const canManageUsers = (user) => {
  if (!user) return false;

  if (user.role === ROLE_ADMIN) return true;

  if (user.role === ROLE_DEFAULT)
    return {
      id: {
        equals: user.id,
      },
    };

  return {
    or: [
      {
        role: {
          not_equals: ROLE_ADMIN,
        },
      },
      {
        id: {
          equals: user.id,
        },
      },
    ],
  };
};

export const canCreateAccounts = (user) =>
  checkRole([ROLE_ADMIN, ROLE_EDITOR], user);
