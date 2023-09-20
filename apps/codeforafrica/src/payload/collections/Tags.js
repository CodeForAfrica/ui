import slug from "../fields/slug";

const Tags = {
  slug: "tag",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true, // Everyone can read Pages
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

export default Tags;
