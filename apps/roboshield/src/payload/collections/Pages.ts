import { CollectionConfig } from "payload/types";
import fullTitle from "../fields/fullTitle";
import slug from "../fields/slug";
import RoboForm from "../blocks/RoboForm";
import { PageHeader } from "../blocks/PageHeader";
import { Content } from "../blocks/Content";
import { Statistics } from "../blocks/Statistics";

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
      blocks: [PageHeader, Content, Statistics, RoboForm],
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
