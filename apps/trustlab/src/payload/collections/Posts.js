import { createdBy, image, richText, slug } from "@commons-ui/payload";

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
    {
      name: "deadline",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    slug({
      fieldToUse: "title",
    }),
    image({
      overrides: {
        name: "image",
        required: true,
      },
    }),
    createdBy({
      overrides: {
        name: "author",
        hidden: false,
        required: true,
        admin: {
          readOnly: false,
        },
      },
    }),
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      localized: true,
      admin: {
        position: "sidebar",
      },
    },
    richText({
      name: "content",
      localized: true,
    }),
    {
      name: "parentPage",
      type: "relationship",
      relationTo: "pages",
      required: true,
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    },
  ],
  versions: {
    drafts: {
      autosave: true,
    },
  },
};

export default Posts;
