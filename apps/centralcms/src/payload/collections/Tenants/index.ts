import type { CollectionConfig } from "payload";
import { superAdmins } from "@/payload/access/superAdmins";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  access: {
    create: superAdmins,
    read: superAdmins,
    update: superAdmins,
    delete: superAdmins,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "domains",
      type: "array",
      index: true,
      fields: [
        {
          name: "domain",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
