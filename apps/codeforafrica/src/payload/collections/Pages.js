import slug from "../fields/slug";
import formatDraftUrl from "../utils/formatDraftUrl";

import { pages } from "./slugNames";

const Pages = {
  slug: pages,
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  versions: {
    drafts: true,
  },
  admin: {
    preview: (doc, options) => formatDraftUrl("pages", doc, options),
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
    },
    slug({ fieldToUse: "title" }),
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
