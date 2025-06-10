import {
  image,
  richText,
  nestCollectionUnderPage,
  slug,
} from "@commons-ui/payload";

const Helplines = {
  slug: "helplines",
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
  ],
  hooks: {
    afterRead: [nestCollectionUnderPage("helplines")],
  },
};

export default Helplines;
