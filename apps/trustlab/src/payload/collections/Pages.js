import { appendPathname, fullTitle, slug } from "@commons-ui/payload";

import { anyone, hasEditorAccess } from "@/trustlab/payload/access";
import blocks from "@/trustlab/payload/blocks";
import {
  hideAPIURL,
  revalidatePage,
  revalidateDelete,
} from "@/trustlab/payload/utils";
import { site } from "@/trustlab/utils";

const Pages = {
  slug: "pages",
  access: {
    read: anyone,
    create: hasEditorAccess,
    update: hasEditorAccess,
    delete: hasEditorAccess,
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

      return `${site.url}preview?${encodedParams.toString()}`;
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
      blocks,
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
    afterRead: [appendPathname],
  },
};

export default Pages;
