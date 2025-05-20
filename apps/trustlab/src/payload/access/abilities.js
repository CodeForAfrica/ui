import { checkRole } from "./checkRole";
import { ROLE_ADMIN, ROLE_EDITOR, ROLE_REVIEWER } from "./roles";

// Admins, editors, and reviewers can create/edit content
export const canEditContent = (user) =>
  checkRole([ROLE_ADMIN, ROLE_EDITOR, ROLE_REVIEWER], user);

// Admins and editors can publish content
export const canPublish = (user) => checkRole([ROLE_ADMIN, ROLE_EDITOR], user);

// Only Admins can update roles
export const canUpdateRoles = (user) => checkRole([ROLE_ADMIN], user);
