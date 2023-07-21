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
  versions: {
    drafts: true,
  },
  admin: {
    defaultColumns: ["fullTitle", "updatedAt"],
    preview: (doc, options) => formatDraftUrl("pages", doc, options),
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    fullTitle(),
    slug(),
    {
      name: "blocks",
      type: "blocks",
      blocks: [],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};

export default Pages;
