import { slug, fullTitle } from "@commons-ui/payload";

import { canManagePages } from "@/trustlab/payload/access/abilities";
import { anyone } from "@/trustlab/payload/access/anyone";
import DonorOverviewList from "@/trustlab/payload/blocks/DonorOverviewList";
import Hero from "@/trustlab/payload/blocks/Hero";
import PartnerOverviewList from "@/trustlab/payload/blocks/PartnerOverviewList";
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
      blocks: [Hero, DonorOverviewList, PartnerOverviewList],
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
