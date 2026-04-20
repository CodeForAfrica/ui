import {
  appendPathnameToCollection,
  image,
  richText,
  slug,
} from "@commons-ui/payload";

const pageByType = {
  baseline: "baseline-reports",
  situational: "situational-reports",
  "bi-weekly": "bi-weekly-reports",
};

async function appendPathnameToReports({ doc, req }) {
  const parentSlug = pageByType[doc.reportType];
  if (!parentSlug) {
    return doc;
  }
  return appendPathnameToCollection(parentSlug)({ doc, req });
}

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
      // TODO(kilemensi): `type` instead of `reportType`
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
    image({
      overrides: {
        name: "pageHeaderImage",
        label: "Page Header Image",
        description: "Image displayed at the top of the report page",
        admin: {
          position: "sidebar",
        },
      },
    }),
    richText({
      name: "pageHeaderDescription",
      label: "Page Header Description",
      description: "Rich text content displayed below the page header image",
      localized: true,
      admin: {
        position: "sidebar",
      },
    }),
  ],
  hooks: {
    afterRead: [appendPathnameToReports],
  },
  timestamps: true,
};

export default Reports;
