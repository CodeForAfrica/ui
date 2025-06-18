import {
  createdBy,
  image,
  nestCollectionUnderPage,
  slug,
  richText,
} from "@commons-ui/payload";

import { canManageContent } from "@/trustlab/payload/access/abilities";
import { anyone } from "@/trustlab/payload/access/anyone";
import { hideAPIURL } from "@/trustlab/payload/utils";

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
      admin: {},
    },
    slug(),
    createdBy({
      overrides: {
        hidden: false,
      },
    }),
    image({
      overrides: {
        name: "image",
        required: true,
      },
    }),
    {
      name: "excerpt",
      type: "textarea",
      localized: true,
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    richText({
      name: "content",
      localized: true,
    }),
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      localized: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: {
    afterRead: [nestCollectionUnderPage("posts")], // TODO:(@kelvinkipruto) Nest this under parent page once it's available
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
};

export default Posts;
