import fullTitle from "../fields/fullTitle";
import slug from "../fields/slug";
import formatDraftUrl from "../utils/formatDraftUrl";

const Pages = {
  slug: "pages",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  admin: {
    defaultColumns: ["fullTitle", "updatedAt"],
    group: "Publication",
    preview: (doc, options) => formatDraftUrl("pages", doc, options),
    useAsTitle: "title",
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
      blocks: [],
      localized: true,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: "variant",
      type: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "Explore", value: "explore" },
      ],
      defaultValue: "default",
      admin: {
        position: "sidebar",
      },
    },
  ],
  versions: {
    drafts: true,
  },
};

export default Pages;