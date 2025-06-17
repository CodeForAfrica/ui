import { richText, image } from "@commons-ui/payload";

const PageOverview = {
  slug: "page-overview",
  imageURL: "/images/cms/blocks/page-overview.png",
  imageAltText: "Page Overview.",
  labels: {
    singular: "Page Overview",
    plural: "Page Overviews",
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
      localized: true,
      admin: {
        description: "A brief description of the content.",
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
