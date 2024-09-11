import type { Access, AccessResult } from "payload";

import { isSuperAdmin } from "@/payload/utilities/isSuperAdmin";

export const adminsAndSelf: any = async ({ req: { user } }) => {
  
  if (user) {
    const isSuper = isSuperAdmin(user);

    // allow super-admins through only if they have not scoped their user via `lastLoggedInTenant`
    if (isSuper && !user?.lastLoggedInTenant) {
      return true;
    }

    // allow users to read themselves and any users within the tenants they are admins of
    return {
      or: [
        {
          id: {
            equals: user.id,
          },
        },
        ...(isSuper
          ? [
              {
                "tenants.tenant": {
                  in: [
                    typeof user?.lastLoggedInTenant === "string"
                      ? user.lastLoggedInTenant
                      : typeof user?.lastLoggedInTenant === "number"
                      ? user.lastLoggedInTenant.toString()
                      : user?.lastLoggedInTenant?.id,
                  ].filter(Boolean),
              
                },
              },
            ]
          : [
              {
                "tenants.tenant": {
                  in:
                  user?.tenants
                  ?.map(({ tenant, roles }) => {
                    if (roles.includes("admin")) {
                      if (typeof tenant === "string") {
                        return tenant;
                      } else if (tenant && typeof tenant === "object" && "id" in tenant) {
                        return tenant.id;
                      }
                    }
                    return null;
                  }) // eslint-disable-line function-paren-newline
                  .filter(Boolean) || [],
                },
              },
            ]),
      ],
    };

    
  }
};
