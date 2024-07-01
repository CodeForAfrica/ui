import { CollectionConfig } from "payload/types";
import fullTitle from "../fields/fullTitle";
import slug from "../fields/slug";
import { PageHeader } from "../blocks/PageHeader";
import { PageHero } from "../blocks/PageHero";

const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  admin: {
    group: "Publication",
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
      blocks: [PageHeader, PageHero],
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
