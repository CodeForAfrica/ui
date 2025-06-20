import { image, richText, slug } from "@commons-ui/payload";

import { canManageContent } from "@/trustlab/payload/access/abilities";
import { anyone } from "@/trustlab/payload/access/anyone";
import { hideAPIURL } from "@/trustlab/payload/utils";

function BaseContentCollection(
  collectionSlug,
  {
    adminGroup = "Publication",
    useAsTitle = "title",
    hasTags = true,
    fields: additionalFields = [],
    hooks = {},
    admin = {},

    ...other
  } = {},
) {
  const fields = [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    slug({ fieldToUse: "title" }),
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
    image({
      overrides: {
        name: "image",
        required: true,
      },
    }),
  ];

  if (hasTags) {
    fields.push({
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      required: true,
      localized: true,
      minRows: 1,
      admin: {
        position: "sidebar",
      },
    });
  }

  fields.push(...additionalFields);

  return {
    slug: collectionSlug,
    access: {
      read: anyone,
      create: ({ req: { user } }) => canManageContent(user),
      update: ({ req: { user } }) => canManageContent(user),
      delete: ({ req: { user } }) => canManageContent(user),
    },
    admin: {
      group: adminGroup,
      hideAPIURL,
      useAsTitle,
      ...admin,
    },
    fields,
    hooks,
    versions: {
      drafts: {
        autosave: true,
      },
    },
    ...other,
  };
}

export default BaseContentCollection;
