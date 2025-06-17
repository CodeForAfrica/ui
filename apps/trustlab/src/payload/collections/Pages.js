import { slug, fullTitle } from "@commons-ui/payload";

import { canManagePages } from "@/trustlab/payload/access/abilities";
import { anyone } from "@/trustlab/payload/access/anyone";
import {
  CallToAction,
  DonorOverviewList,
  HelplinesOverviewList,
  Hero,
  Content,
  PageHeader,
  PartnerOverviewList,
  PartnersList,
  ResourcesOverviewList,
  WhatWeDo,
} from "@/trustlab/payload/blocks";
import { hideAPIURL } from "@/trustlab/payload/utils";

const Pages = {
  slug: "pages",
  access: {
    read: anyone,
    create: ({ req: { user } }) => canManagePages(user),
    update: ({ req: { user } }) => canManagePages(user),
    delete: ({ req: { user } }) => canManagePages(user),
  },
  admin: {
    defaultColumns: ["fullTitle", "updatedAt", "_status"],
    group: "Publication",
    useAsTitle: "title",
    hideAPIURL,
    preview: ({ slug: pageSlug }) => {
      const encodedParams = new URLSearchParams({
        slug: pageSlug,
        path: `/${pageSlug}`,
      });

      return `${process.env.NEXT_PUBLIC_APP_URL}/preview?${encodedParams.toString()}`;
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
      blocks: [
        HelplinesOverviewList,
        Hero,
        CallToAction,
        DonorOverviewList,
        PageHeader,
        Content,
        PartnerOverviewList,
        PartnersList,
        WhatWeDo,
        ResourcesOverviewList,
      ],
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
