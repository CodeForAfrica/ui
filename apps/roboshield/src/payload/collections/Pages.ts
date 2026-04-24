import type { CollectionConfig } from "payload";

import { Content } from "../blocks/Content";
import { PageHeader } from "../blocks/PageHeader";
import RobotsTxtGenerator from "../blocks/RobotsTxtGenerator";
import { SiteHero } from "../blocks/SiteHero";
import { Statistics } from "../blocks/Statistics";
import fullTitle from "../fields/fullTitle";
import slug from "../fields/slug";
import formatDraftUrl from "../utils/formatDraftUrl";

const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: ({ req }) => {
      // If there is a user logged in,
      // let them retrieve all documents
      if (req.user) return true;

      // If there is no user,
      // restrict the documents that are returned
      // to only those where `_status` is equal to `published`
      return {
        _status: {
          equals: "published",
        },
      };
    },
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
