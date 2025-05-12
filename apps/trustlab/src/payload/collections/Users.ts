import { CollectionConfig } from "payload";

const Users: CollectionConfig = {
  slug: "users",
  admin: {
    defaultColumns: ["firstName", "lastName", "email", "updatedAt"],
    group: "Settings",
    useAsTitle: "email",
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
      ],
    },
  ],
};

export default Users;
