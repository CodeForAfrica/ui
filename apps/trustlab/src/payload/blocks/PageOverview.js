import { richText, image } from "@commons-ui/payload";

const PageOverview = {
  slug: "page-overview",
  imageURL: "/images/cms/blocks/overview.png",
  imageAltText: "Page Overview.",
  labels: {
    singular: {
      en: "Page Overview",
    },
    plural: {
      en: "Page Overviews",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    richText({
      name: "description",
      required: true,
      admin: {
        description: "A brief description of the slide content.",
      },
    }),
    image({
      overrides: {
        name: "image",
        required: true,
      },
    }),
  ],
};

export default PageOverview;
