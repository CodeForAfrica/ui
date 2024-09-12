import type { Access } from "payload";
import type { FieldHook } from "payload";
import { checkUserRoles } from "@/payload/utilities/checkUserRoles";

export const superAdmins: Access = ({ req: { user } }) =>
  checkUserRoles(["super-admin"], user);

export const superAdminFieldAccess: FieldHook = ({ req: { user } }) =>
  checkUserRoles(["super-admin"], user);
