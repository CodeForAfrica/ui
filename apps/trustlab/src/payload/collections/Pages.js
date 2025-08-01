import { slug, fullTitle } from "@commons-ui/payload";

import { canManagePages } from "@/trustlab/payload/access/abilities";
import { anyone } from "@/trustlab/payload/access/anyone";
import {
  CallToAction,
  Content,
  DonorOverviewList,
  Gallery,
  HelplinesOverviewList,
  Hero,
  PageHeader,
  PageOverview,
  PartnerOverviewList,
  PartnersList,
  PostList,
  ResourcesOverviewList,
  Spotlight,
  WhatWeDo,
} from "@/trustlab/payload/blocks";
import {
  hideAPIURL,
  revalidatePage,
  revalidateDelete,
} from "@/trustlab/payload/utils";

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
        Gallery,
        PageHeader,
        PageOverview,
        Content,
        PartnerOverviewList,
        PartnersList,
        PostList,
        WhatWeDo,
        ResourcesOverviewList,
        Spotlight,
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
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
  },
};

export default Pages;
