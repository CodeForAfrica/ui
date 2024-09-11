import slug from "@/payload/fields/slug";
import type { CollectionConfig } from "payload";
import { canRead } from "@/payload/access/codeforafrica";

const Teams: CollectionConfig = {
  slug: "teams",
  access: {
    read: canRead,
    create: () => true,
    update: () => true,
  },
  admin: {
    defaultColumns: ["name", "updatedAt"],
    enableRichTextLink: false,
    group: "Organisation",
    useAsTitle: "name",
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
