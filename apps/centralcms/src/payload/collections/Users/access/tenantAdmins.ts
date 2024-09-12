import type { FieldAccess } from "payload";

import { checkUserRoles } from "@/payload/utilities/checkUserRoles";
import { checkTenantRoles } from "../utilities/checkTenantRoles";
import { User } from "payload";

export const tenantAdmins: FieldAccess = (args) => {
  const {
    req: { user },
    doc,
  } = args;

  return (
    checkUserRoles(["super-admin"], user) ||
    doc?.tenants?.some(({ tenant }) => {
      const id = typeof tenant === "string" ? tenant : tenant?.id;
      return checkTenantRoles(["admin"], user as User, id);
    })
  );
};
