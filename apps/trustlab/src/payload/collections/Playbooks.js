import { image, richText, slug } from "@commons-ui/payload/fields";

import { anyone, hasEditorAccess } from "@/trustlab/payload/access";

const Playbooks = {
  slug: "playbooks",
  labels: { singular: "Playbook", plural: "Playbooks" },
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
