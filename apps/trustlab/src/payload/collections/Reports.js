import { image, richText, slug } from "@commons-ui/payload";

const Reports = {
  slug: "reports",
  labels: { singular: "Report", plural: "Reports" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "reportType", "updatedAt"],
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
      name: "overview",
      localized: true,
    }),
    {
      name: "reportType",
      type: "select",
      required: true,
      options: [
        { label: "Baseline", value: "baseline" },
        { label: "Situational", value: "situational" },
        { label: "Bi-weekly", value: "bi-weekly" },
      ],
    },
    {
      name: "file",
      type: "upload",
      relationTo: "media",
      label: "Upload Report File",
    },
    {
      name: "date",
      label: {
        en: "Published Date",
      },
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
};

export default Reports;
