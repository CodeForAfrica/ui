import { checkRole } from "./checkRole";
import { hasValidRole, ROLE_ADMIN, ROLE_AUTHOR, ROLE_EDITOR } from "./roles";

export const isLoggedIn = (user) => hasValidRole(user);

export const hasLoggedInAccess = ({ req } = {}) => isLoggedIn(req?.user);

// Admins and editors can manage any content
export const isEditor = (user) => checkRole([ROLE_ADMIN, ROLE_EDITOR], user);

export const hasEditorAccess = ({ req } = {}) => isEditor(req?.user);

export const isAuthor = (user) => {
  // Any valid CMS user has at least author-level capability.
  return isLoggedIn(user);
};

export const canAuthor = (user) => {
  if (!isLoggedIn(user)) {
    return false;
  }
  if (isEditor(user)) {
    return true;
  }
  if (!user.id) {
    return false;
  }
  // Authors can manage own content only
  return {
    createdBy: {
      equals: user.id,
    },
  };
};

export const hasAuthorAccess = ({ req } = {}) => canAuthor(req?.user);

export const isAdmin = (user) => checkRole([ROLE_ADMIN], user);

export const hasAdminAccess = ({ req } = {}) => isAdmin(req?.user);

// TODO(@kelvinkipruto): what happens on delete? cascade or not?
export const canManageUser = (user) => {
  if (!isLoggedIn(user)) {
    return false;
  }
  // Admins can manage all users
  if (user.role === ROLE_ADMIN) {
    return true;
  }
  // All other users can manage their own accounts
  if (!user.id) {
    return false;
  }
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

export const hasManageUserAccess = ({ req } = {}) => canManageUser(req?.user);

export const hasCreateUserAccess = (args) => hasEditorAccess(args);

export default undefined;
