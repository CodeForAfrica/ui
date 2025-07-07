import {
  createdBy,
  image,
  linkGroup,
  nestCollectionUnderPage,
  publishedOn,
  slug,
} from "@commons-ui/payload";
import { createParentField } from "@payloadcms/plugin-nested-docs";

import {
  Content,
  DonorOverviewList,
  Gallery,
  PartnerOverviewList,
  PageOverview,
} from "../blocks";

import { canManageContent } from "@/trustlab/payload/access/abilities";
import { anyone } from "@/trustlab/payload/access/anyone";
import { hideAPIURL, revalidatePost } from "@/trustlab/payload/utils";

const Posts = {
  slug: "posts",
  admin: {
    group: "Publication",
    defaultColumns: ["title", "excerpt", "image"],
    hideAPIURL,
    useAsTitle: "title",
  },
  access: {
    read: anyone,
    create: ({ req: { user } }) => canManageContent(user),
    update: ({ req: { user } }) => canManageContent(user),
    delete: ({ req: { user } }) => canManageContent(user),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    slug({ fieldToUse: "title" }),
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
    {
      name: "content",
      type: "blocks",
      blocks: [
        Content,
        PageOverview,
        DonorOverviewList,
        Gallery,
        PartnerOverviewList,
      ],
      localized: true,
      required: true,
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      localized: true,
      minRows: 1,
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "group",
      fields: [
        {
          type: "checkbox",
          name: "isApplication",
          label: "Is Application",
          defaultValue: false,
          required: true,
          admin: {
            description: "Select if this is an application post",
          },
        },
        {
          name: "deadline",
          type: "date",
          admin: {
            position: "sidebar",
            condition: (_, siblingData) => siblingData?.isApplication,
          },
        },
        linkGroup({
          overrides: {
            name: "applicationLink",
            label: "Application Link",
            admin: {
              hideGutter: true,
              condition: (_, siblingData) => siblingData?.isApplication,
            },
          },
        }),
      ],
    },
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
    createParentField("pages", {
      required: true,
    }),
    publishedOn(),
  ],
  hooks: {
    afterRead: [
      ({ doc, req }) => {
        const parent = doc?.parent?.slug;
        if (!parent) {
          return doc;
        }
        const hook = nestCollectionUnderPage(parent);
        return hook({ doc, req });
      },
    ],
    afterChange: [revalidatePost],
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
};

export default Posts;
