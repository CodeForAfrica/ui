/* eslint-disable import/prefer-default-export */

import { checkRole } from "@/trustlab/payload/access/checkRole";
import { ROLE_ADMIN } from "@/trustlab/payload/access/roles";

export const protectRoles = async ({ req, data, originalDoc }) => {
  const { user } = req;
  const isAdmin = checkRole([ROLE_ADMIN], user);

  if (!isAdmin) {
    return originalDoc?.roles || [];
  }
  return data;
};
