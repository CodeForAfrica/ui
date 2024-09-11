
import type { CollectionConfig } from "payload";
import { canRead } from "@/payload/access/codeforafrica";

const Authors: CollectionConfig = {
  slug: "author",
  access: {
    read: canRead,
    create: () => true,
    update: () => true,
  },
  admin: {
    defaultColumns: ["fullName", "updatedAt"],
    enableRichTextLink: false,
    group: "Publications",
    useAsTitle: "fullName",
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "bio",
      type: "textarea",
      localized: true,
    },
  ],
};

export default Authors;
