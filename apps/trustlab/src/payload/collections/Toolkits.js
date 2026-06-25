import { image, richText, slug, linkGroup } from "@commons-ui/payload/fields";

import { anyone, hasEditorAccess } from "@/trustlab/payload/access";

const Toolkits = {
  slug: "toolkits",
  labels: { singular: "Toolkit", plural: "Toolkits" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "updatedAt"],
  },
  access: {
    read: anyone,
    create: hasEditorAccess,
    update: hasEditorAccess,
    delete: hasEditorAccess,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      index: true,
    },
    image({ name: "image" }),
    slug({ name: "slug" }),
    richText({
      name: "description",
      localized: true,
    }),
    linkGroup({
      overrides: {
        name: "link",
        admin: { description: "Primary link for this toolkit" },
      },
    }),
  ],
  timestamps: true,
};

export default Toolkits;
