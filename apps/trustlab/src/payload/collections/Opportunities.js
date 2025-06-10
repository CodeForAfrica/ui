import { image, richText, slug } from "@commons-ui/payload";

const Opportunities = {
  slug: "opportunities",
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
      name: "deadline",
      type: "date",
      required: true,
    },
  ],
};

export default Opportunities;
