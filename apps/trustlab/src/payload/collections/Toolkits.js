import { image, richText, slug, linkGroup } from "@commons-ui/payload";

const Toolkits = {
  slug: "toolkits",
  labels: { singular: "Toolkit", plural: "Toolkits" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "updatedAt"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
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
