import { checkRole } from "./checkRole";
import { ROLE_ADMIN, ROLE_AUTHOR, ROLE_EDITOR } from "./roles";

export const canManageContent = (user) => {
  // Admin and editors can manage any content
  if (checkRole([ROLE_ADMIN, ROLE_EDITOR], user)) {
    return true;
  }

  // Everyone else can only manage their own content
  return {
    createdBy: {
      equals: user.id,
    },
  };
};

export const canManagePages = (user) =>
  checkRole([ROLE_ADMIN, ROLE_EDITOR], user);

export const canManageSiteSettings = (user) => checkRole([ROLE_ADMIN], user);

// TODO: what happens on delete? cascade or not?
export const canManageUsers = (user) => {
  if (!user) {
    return false;
  }

  // admin can manage all users
  if (user.role === ROLE_ADMIN) {
    return true;
  }

  // editors can only manage authors and themselves
  if (user.role === ROLE_EDITOR) {
    return {
      or: [
        {
          role: {
            equals: ROLE_AUTHOR,
          },
        },
        {
          id: {
            equals: user.id,
          },
        },
      ],
    };
  }

  return {
    id: {
      equals: user.id,
    },
  };
};

export const canCreateAccounts = (user) =>
  checkRole([ROLE_ADMIN, ROLE_EDITOR], user);
