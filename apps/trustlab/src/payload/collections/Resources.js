import { image, richText, slug } from "@commons-ui/payload";

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
};

export default Resources;
