import {
  image,
  nestCollectionUnderPage,
  richText,
  slug,
} from "@commons-ui/payload";

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
      localized: true,
      admin: {
        position: "sidebar",
      },
    });
  }

  fields.push(...additionalFields);

  return {
    slug: collectionSlug,
    admin: {
      group: adminGroup,
      hideAPIURL,
      useAsTitle,
      ...admin,
    },
    fields,
    hooks: {
      afterRead: [nestCollectionUnderPage(collectionSlug)],
      ...hooks,
    },
    ...other,
  };
}

export default BaseContentCollection;
