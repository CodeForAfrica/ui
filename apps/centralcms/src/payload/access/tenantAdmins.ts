import type { Access, AccessArgs } from "payload";
import { checkUserRoles } from "@/payload/utilities/checkUserRoles";
import { isTenant } from "@/payload/utilities/typeGuards";

// the user must be an admin of the document's tenant
export const tenantAdmins: Access = ({ req: { user } }: AccessArgs) => {
  if (checkUserRoles(["super-admin"], user)) {
    return true;
  }

  const adminTenants = user?.tenants
    ?.map(({ tenant, roles }) =>
      roles.includes("admin")
        ? isTenant(tenant)
          ? tenant.id
          : tenant
        : null
    ) // eslint-disable-line function-paren-newline
    .filter(Boolean) || [];

  return {
    tenant: {
      in: adminTenants,
    },
  };
};
