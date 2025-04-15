import type { CollectionConfig } from "payload";
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
    livePreview: {
      url: ({ data }) =>
        `${process.env.PAYLOAD_PUBLIC_APP_URL}${data.slug !== "home" ? `/${data.slug}` : ""}`,
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
      blocks: [PageHeader, SiteHero, Content, Statistics, RobotsTxtGenerator],
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
};

export default Pages;
