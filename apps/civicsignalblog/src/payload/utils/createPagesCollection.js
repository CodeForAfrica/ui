import formatDraftUrl from "./formatDraftUrl";

import fullTitle from "@/civicsignalblog/payload/fields/fullTitle";
import slug from "@/civicsignalblog/payload/fields/slug";

const Pages = ({
  pageSlug,
  group,
  defaultColumns,
  blocks,
  access = {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  pagesOptions = {},
}) => {
  return {
    slug: pageSlug,
    access,
    labels: {
      singular: "Page",
      plural: "Pages",
    },
    admin: {
      defaultColumns,
      group,
      preview: (doc, options) => formatDraftUrl("pages", doc, options),
      useAsTitle: "title",
      livePreview: {
        url: ({ data }) =>
          `${process.env.PAYLOAD_PUBLIC_APP_URL}/${data.slug !== "index" ? `${data.slug}` : ""}`,
      },
    },
    fields: [
      {
        name: "title",
        type: "text",
        required: true,
        localized: true,
      },
      fullTitle({ overrides: { localized: true } }),
      slug(),
      {
        name: "blocks",
        type: "blocks",
        // Generally sort blocks alphabetically but keep related blocks next to
        // each other e.g. while alphabecially CustomPageHeader should be with C,
        // it's functiaonally equivalent with PageHeader so we keep it next to
        // PageHeader
        blocks,
        localized: true,
        admin: {
          initCollapsed: true,
        },
      },
    ],
    versions: {
      drafts: {
        autosave: true,
      },
    },
    ...pagesOptions,
  };
};

export default Pages;
