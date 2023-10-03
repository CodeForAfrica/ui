import slug from "../fields/slug";

const Teams = {
  slug: "teams",
  admin: {
    defaultColumns: ["name", "updatedAt"],
    enableRichTextLink: false,
    group: "Organisation",
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
      localized: true,
      required: true,
    },
    slug({ fieldToUse: "name" }),
  ],
};

export default Teams;
