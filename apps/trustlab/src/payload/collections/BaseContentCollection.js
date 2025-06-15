import {
  image,
  nestCollectionUnderPage,
  richText,
  slug,
} from "@commons-ui/payload";

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
      name: "shortDescription",
      type: "textarea",
      localized: true,
      required: true,
    },
    richText({
      name: "description",
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
      hideAPIURL: true,
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
