import { image, richText, slug } from "@commons-ui/payload";

const Playbooks = {
  slug: "playbooks",
  labels: { singular: "Playbook", plural: "Playbooks" },
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
    {
      name: "pdf",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "PDF File",
      admin: {
        description: "Upload the playbook PDF",
      },
    },
  ],
  timestamps: true,
};

export default Playbooks;
