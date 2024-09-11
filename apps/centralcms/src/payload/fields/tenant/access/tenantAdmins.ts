import type { FieldAccess } from "payload";

import { checkUserRoles } from "@/payload/utilities/checkUserRoles";
import { isTenant } from "@/payload/utilities/typeGuards";

export const tenantAdminFieldAccess: FieldAccess = ({ req: { user }, doc }: any) => {
  if (checkUserRoles(["super-admin"], user)) {
    return true;
  }

  const docTenantId = isTenant(doc?.tenant) ? doc.tenant.id : doc?.tenant;

  return (
    !doc?.tenant ||
    user?.tenants?.some(
      ({ tenant: userTenant, roles }) =>
        (typeof userTenant === "string" ? userTenant : userTenant.id) === docTenantId &&
        roles?.includes("admin")
    )
  );
};
