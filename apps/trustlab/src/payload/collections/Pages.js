import { slug, fullTitle } from "@commons-ui/payload";

import TestBlock from "@/trustlab/payload/blocks/TestBlock";

const Pages = {
  slug: "pages",
  access: {
    read: ({ req }) => {
      if (req.user) return true;
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
    defaultColumns: ["fullTitle", "updatedAt"],
    group: "Publication",
    useAsTitle: "title",
    hideAPIURL: true,
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
      // TODO: Remove TestBlock. Payload admin breaks if blocks is empty.
      blocks: [TestBlock],
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
