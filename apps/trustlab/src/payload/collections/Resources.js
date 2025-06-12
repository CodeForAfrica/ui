import {
  image,
  nestCollectionUnderPage,
  richText,
  slug,
} from "@commons-ui/payload";

const Resources = {
  slug: "resources",
  admin: {
    group: "Publication",
    hideAPIURL: true,
    useAsTitle: "title",
  },
  fields: [
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
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
  ],
  hooks: {
    afterRead: [nestCollectionUnderPage("resources")],
  },
};

export default Resources;
