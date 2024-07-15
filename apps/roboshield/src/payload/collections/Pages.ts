import { CollectionConfig } from "payload/types";
import fullTitle from "../fields/fullTitle";
import slug from "../fields/slug";
import RobotsTxtGenerator from "../blocks/RobotsTxtGenerator";
import { PageHeader } from "../blocks/PageHeader";
import { Content } from "../blocks/Content";
import { Statistics } from "../blocks/Statistics";
import formatDraftUrl from "../utils/formatDraftUrl";
import { SiteHero } from "../blocks/SiteHero";

const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  admin: {
    defaultColumns: ["fullTitle", "slug", "updatedAt"],
    group: "Publication",
    useAsTitle: "title",
    preview: (doc) => formatDraftUrl("pages", doc),
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
      blocks: [PageHeader, SiteHero, Content, Statistics, RobotsTxtGenerator],
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
