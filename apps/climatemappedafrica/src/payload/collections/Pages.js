import DataVisualisationGuide from "../blocks/DataVisualisationGuide";
import Summary from "../blocks/Summary";
import Team from "../blocks/Team";
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
      blocks: [DataVisualisationGuide, Summary, Team],
      localized: true,
      admin: {
        initCollapsed: true,
      },
    },
  ],
  versions: {
    drafts: true,
  },
};

export default Pages;
