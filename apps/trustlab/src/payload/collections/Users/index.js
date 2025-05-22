import { protectRoleField } from "./hooks/protectRoleField";

import {
  canCreateAccounts,
  canManageUsers,
} from "@/trustlab/payload/access/abilities";
import { ROLE_DEFAULT, ROLE_OPTIONS } from "@/trustlab/payload/access/roles";

const Users = {
  slug: "users",
  admin: {
    defaultColumns: ["firstName", "lastName", "email", "role", "updatedAt"],
    useAsTitle: "email",
    group: "Settings",
    hideAPIURL: true,
  },
  access: {
    delete: ({ req: { user } }) => canManageUsers(user),
    create: ({ req: { user } }) => canCreateAccounts(user),
    read: ({ req: { user } }) => canManageUsers(user),
    update: ({ req: { user } }) => canManageUsers(user),
    unlock: ({ req: { user } }) => canManageUsers(user),
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
          name: "role",
          type: "select",
          required: true,
          saveToJWT: true,
          defaultValue: ROLE_DEFAULT,
          options: ROLE_OPTIONS,
          hooks: {
            beforeChange: [protectRoleField],
          },
          access: {
            update: ({ req: { user } }) => user?.role !== ROLE_DEFAULT,
          },
        },
      ],
    },
  ],
};

export default Users;
