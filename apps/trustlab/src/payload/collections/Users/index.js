import { protectRoleField } from "./hooks/protectRoleField";

import {
  hasCreateUserAccess,
  hasManageUserAccess,
} from "@/trustlab/payload/access";
import { ROLE_AUTHOR, ROLE_OPTIONS } from "@/trustlab/payload/access/roles";

const Users = {
  slug: "users",
  admin: {
    defaultColumns: ["firstName", "lastName", "email", "role", "updatedAt"],
    useAsTitle: "email",
    group: "Settings",
    hideAPIURL: true,
  },
  access: {
    delete: hasManageUserAccess,
    create: hasCreateUserAccess,
    read: hasManageUserAccess,
    update: hasManageUserAccess,
    unlock: hasManageUserAccess,
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
          defaultValue: ROLE_AUTHOR,
          options: ROLE_OPTIONS,
          hooks: {
            beforeChange: [protectRoleField],
          },
          access: {
            update: hasCreateUserAccess,
          },
        },
      ],
    },
  ],
};

export default Users;
