import { slug, fullTitle } from "@commons-ui/payload";

import {
  canEditContent,
  canPublish,
} from "@/trustlab/payload/access/abilities";
import { anyone } from "@/trustlab/payload/access/anyone";
import TestBlock from "@/trustlab/payload/blocks/TestBlock";

const Pages = {
  slug: "pages",
  access: {
    read: anyone,
    create: ({ req: { user } }) => canEditContent(user),
    update: ({ req: { user } }) => canEditContent(user),
    delete: ({ req: { user } }) => canEditContent(user),
    readVersions: ({ req: { user } }) => canPublish(user),
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
    components: {
      edit: {
        PublishButton:
          "@/trustlab/payload/components/PagesPublishButton#PagesPublishButton",
        PreviewButton:
          "@/trustlab/payload/components/PagesPreviewButton#PagesPreviewButton",
      },
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
