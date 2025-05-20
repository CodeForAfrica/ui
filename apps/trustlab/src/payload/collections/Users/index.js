import { protectRoles } from "./hooks/protectRoles";

import { canUpdateRoles } from "@/trustlab/payload/access/abilities";
import { admins, adminsOrSelf } from "@/trustlab/payload/access/admins";
import { ROLE_DEFAULT, ROLE_OPTIONS } from "@/trustlab/payload/access/roles";

const Users = {
  slug: "users",
  admin: {
    defaultColumns: ["firstName", "lastName", "email", "roles", "updatedAt"],
    useAsTitle: "email",
    group: "Settings",
    hideAPIURL: true,
  },
  access: {
    delete: ({ req: { user } }) => admins(user),
    create: ({ req: { user } }) => admins(user),
    read: ({ req: { user } }) => adminsOrSelf(user),
    update: ({ req: { user } }) => adminsOrSelf(user),
    unlock: ({ req: { user } }) => admins(user),
  },
  auth: true,
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "firstName",
          type: "text",
          required: true,
        },
        {
          name: "lastName",
          type: "text",
          required: true,
        },
        {
          name: "roles",
          type: "select",
          hasMany: true,
          required: true,
          saveToJWT: true,
          defaultValue: [ROLE_DEFAULT],
          options: ROLE_OPTIONS,
          hooks: {
            beforeChange: [protectRoles],
          },
          access: {
            update: ({ req: { user } }) => canUpdateRoles(user),
          },
        },
      ],
    },
  ],
};

export default Users;
