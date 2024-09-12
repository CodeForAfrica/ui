import type { Access, AccessArgs } from "payload";

import { isSuperAdmin } from "@/payload/utilities/isSuperAdmin";
import { isTenant } from "@/payload/utilities/typeGuards";

export const tenants: Access = ({ req: { user }, data }: AccessArgs) => {
  const lastLoggedInTenantId = isTenant(user?.lastLoggedInTenant)
    ? user.lastLoggedInTenant.id
    : user?.lastLoggedInTenant;

  return (
    (data?.tenant?.id && lastLoggedInTenantId === data.tenant.id) ||
    (!lastLoggedInTenantId && isSuperAdmin(user)) || {
      tenant: {
        equals: lastLoggedInTenantId,
      },
    }
  );
};
