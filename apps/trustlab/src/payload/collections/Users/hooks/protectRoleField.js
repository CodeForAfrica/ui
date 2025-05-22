/* eslint-disable import/prefer-default-export */

import {
  ROLE_ADMIN,
  ROLE_AUTHOR,
  ROLE_DEFAULT,
  ROLE_EDITOR,
} from "@/trustlab/payload/access/roles";

export const protectRoleField = ({ req, data, originalDoc, operation }) => {
  if (data?.role === originalDoc?.role) return originalDoc?.role;

  const { user } = req;

  if (!user) return originalDoc?.role || ROLE_DEFAULT;

  const userRole = user.role;

  if (userRole === ROLE_ADMIN) return data?.role;
  if (userRole === ROLE_AUTHOR) return originalDoc?.role || ROLE_DEFAULT;
  if (userRole === ROLE_EDITOR) {
    if (data?.role === ROLE_EDITOR || data?.role === ROLE_AUTHOR) {
      return data?.role;
    }
    if (operation === "create") {
      if (data?.role === ROLE_ADMIN) {
        return ROLE_DEFAULT;
      }
    }
    return originalDoc?.role;
  }
  return ROLE_DEFAULT;
};
