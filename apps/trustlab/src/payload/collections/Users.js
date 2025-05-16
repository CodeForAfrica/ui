const Users = {
  slug: "users",
  admin: {
    defaultColumns: ["firstName", "lastName", "email", "updatedAt"],
    useAsTitle: "email",
    group: "Settings",
    hideAPIURL: true,
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
