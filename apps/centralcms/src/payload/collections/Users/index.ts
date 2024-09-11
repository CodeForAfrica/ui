import type { CollectionConfig } from "payload";

import { anyone } from "@/payload/access/anyone";
import { superAdminFieldAccess } from "@/payload/access/superAdmins";
import { adminsAndSelf } from "./access/adminsAndSelf";
import { tenantAdmins } from "./access/tenantAdmins";
import { recordLastLoggedInTenant } from "./hooks/recordLastLoggedInTenant";
import { checkDomain } from "./hooks/checkDomain";
import { isSuperOrTenantAdmin } from "./utilities/isSuperOrTenantAdmin";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    useAPIKey: true,
  },
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: adminsAndSelf,
    create: anyone,
    update: adminsAndSelf,
    delete: adminsAndSelf,
    admin: isSuperOrTenantAdmin,
  },
  hooks: {
    afterLogin: [recordLastLoggedInTenant],
    beforeLogin: [checkDomain]
  },
  fields: [
    {
      name: "firstName",
      type: "text",
    },
    {
      name: "lastName",
      type: "text",
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      required: true,
      access: {
        create: superAdminFieldAccess,
        update: superAdminFieldAccess,
        read: superAdminFieldAccess,
      },
      options: [
        {
          label: "Super Admin",
          value: "super-admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
    {
      name: "tenants",
      type: "array",
      label: "Tenants",
      access: {
        create: tenantAdmins,
        update: tenantAdmins,
        read: tenantAdmins,
      },
      fields: [
        {
          name: "tenant",
          type: "relationship",
          relationTo: "tenants",
          required: true,
        },
        {
          name: "roles",
          type: "select",
          hasMany: true,
          required: true,
          options: [
            {
              label: "Admin",
              value: "admin",
            },
            {
              label: "User",
              value: "user",
            },
          ],
        },
      ],
    },
    {
      name: "lastLoggedInTenant",
      type: "relationship",
      relationTo: "tenants",
      index: true,
      access: {
        create: () => false,
        read: tenantAdmins,
        update: superAdminFieldAccess,
      },
      admin: {
        position: "sidebar",
      },
    },
  ],
};
