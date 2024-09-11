import type { Access } from "payload";
import { isSuperAdmin } from "@/payload/utilities/isSuperAdmin";

// the user must be an admin of the tenant being accessed
export const tenantAdmins: Access = ({ req: { user } }) => {
  if (isSuperAdmin(user)) {
    return true;
  }

  return {
    id: {
      in:
      user?.tenants
      ?.map(({ tenant, roles }) => {
        if (roles.includes("admin")) {
          if (typeof tenant === "string") {
            return tenant;
          } else if (typeof tenant === "object" && "id" in tenant) {
            return tenant.id;
          }
        }
        return null;
      }) // eslint-disable-line function-paren-newline
      .filter(Boolean) || [],
    },
  };
};
