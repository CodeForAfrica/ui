import { isAdmin, isAdminFieldLevel } from "../access/isAdmin";
import {
  isAdminOrSelf,
  isAdminOrSelfFieldLevel,
} from "../access/isAdminOrSelf";
import { ROLE_DEFAULT, ROLE_OPTIONS } from "../access/roles";

const Users = {
  slug: "users",
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  admin: {
    defaultColumns: ["firstName", "lastName", "email", "updatedAt"],
    enableRichTextLink: false,
    group: "Website",
    useAsTitle: "email",
  },
  auth: {
    verify: true,
  },
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
      ],
    },
    {
      name: "roles",
      type: "select",
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      required: true,
      defaultValue: [ROLE_DEFAULT],
      access: {
        read: isAdminOrSelfFieldLevel,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: ROLE_OPTIONS,
    },
  ],
};

export default Users;
