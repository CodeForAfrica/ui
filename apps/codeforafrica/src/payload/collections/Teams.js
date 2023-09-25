import slug from "../fields/slug";

const Teams = {
  slug: "teams",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      localized: true,
      required: true,
      unique: true,
    },
    slug({ fieldToUse: "name" }),
  ],
};

export default Teams;
