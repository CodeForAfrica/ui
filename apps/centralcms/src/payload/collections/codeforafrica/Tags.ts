import slug from "@/payload/fields/slug";
import type { CollectionConfig } from "payload";
import { canRead } from "@/payload/access/codeforafrica";

const Tags: CollectionConfig = {
  slug: "tag",
  access: {
    read: canRead,
    create: () => true,
    update: () => true,
  },
  admin: {
    defaultColumns: ["name", "updatedAt"],
    enableRichTextLink: false,
    group: "Publications",
    useAsTitle: "name",
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
