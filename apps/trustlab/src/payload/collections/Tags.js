import { slug } from "@commons-ui/payload";

const Tags = {
  slug: "tags",
  admin: {
    group: "Publication",
    useAsTitle: "name",
    defaultColumns: ["name", "slug"],
    hideAPIURL: true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    slug({ fieldToUse: "name" }),
  ],
};

export default Tags;
