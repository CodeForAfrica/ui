import { richText, image, linkGroup } from "@commons-ui/payload";

import colorSettingsField from "../fields/colorSettingsField";

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
    colorSettingsField({
      backgroundOverrides: {
        defaultValue: "#F0F0F5",
      },
      textOverrides: {
        defaultValue: "#000000",
      },
    }),
  ],
};

export default PageOverview;
