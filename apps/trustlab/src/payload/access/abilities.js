import { checkRole } from "./checkRole";
import { ROLE_ADMIN, ROLE_AUTHOR, ROLE_EDITOR } from "./roles";

export const canManageContent = (user) => {
  if (!user) {
    return false;
  }
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

// TODO(@kelvinkipruto): what happens on delete? cascade or not?
export const canManageUsers = (user) => {
  if (!user) {
    return false;
  }
  // Admins can manage all users
  if (user.role === ROLE_ADMIN) {
    return true;
  }
  // All other users can manage their own accounts
  const orQuery = [
    {
      id: {
        equals: user.id,
      },
    },
  ];
  // Editors can manage authors (in addition to their accounts)
  if (user.role === ROLE_EDITOR) {
    orQuery.push({ role: { equals: ROLE_AUTHOR } });
  }
  return {
    or: orQuery,
  };
};

export const canCreateAccounts = (user) =>
  checkRole([ROLE_ADMIN, ROLE_EDITOR], user);
