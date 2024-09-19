import slug from "../../fields/slug";

const Tags = {
  slug: "tag",
  admin: {
    defaultColumns: ["name", "updatedAt"],
    enableRichTextLink: false,
    group: "Research Blog",
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      unique: true,
      required: true,
      localized: true,
    },
    slug({ fieldToUse: "name" }),
  ],
};

export default Tags;
