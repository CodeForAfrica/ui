import { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";

const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "content",
      type: "richText",
    },
    ...slugField("title"),
  ],
};
export default Pages;
