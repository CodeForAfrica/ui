import { slug, createdBy } from "@commons-ui/payload";

import { canManageContent } from "@/trustlab/payload/access/abilities";
import { anyone } from "@/trustlab/payload/access/anyone";

const Posts = {
  slug: "posts",
  access: {
    read: anyone,
    create: ({ req: { user } }) => canManageContent(user),
    update: ({ req: { user } }) => canManageContent(user),
    delete: ({ req: { user } }) => canManageContent(user),
  },
  admin: {
    defaultColumns: ["title", "createdBy", "updatedAt", "_status"],
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
      admin: {},
    },
    slug(),
    createdBy({
      overrides: {
        hidden: false,
      },
    }),
  ],
  versions: {
    drafts: {
      autosave: true,
    },
  },
};

export default Posts;
