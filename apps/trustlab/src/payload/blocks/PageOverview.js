import { richText, image, linkGroup } from "@commons-ui/payload";

const PageOverview = {
  slug: "page-overview",
  imageURL: "/images/cms/blocks/page-overview.png",
  imageAltText: "Page Overview.",
  labels: {
    singular: "Page Overview",
    plural: "Page Overviews",
  },
  fields: [
    richText({
      name: "content",
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
    {
      name: "caption",
      type: "text",
      localized: true,
    },
    linkGroup({
      overrides: {
        name: "buttonLink",
        label: "Button Link",
        required: false,
      },
      linkConfig: {
        required: false,
      },
    }),
  ],
};

export default PageOverview;
