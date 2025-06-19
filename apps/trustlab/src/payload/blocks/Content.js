import { richText } from "@commons-ui/payload";

import colourField from "../fields/colourField";

const Content = {
  slug: "content",
  imageURL: "/images/cms/blocks/content.png",
  imageAltText: "Adds rich text to a page.",
  fields: [
    richText({
      name: "content",
      required: true,
      localized: true,
    }),
    colourField({
      backgroundOverrides: {
        defaultValue: "#F0F0F5",
      },
      textOverrides: {
        defaultValue: "#000000",
      },
    }),
  ],
};

export default Content;
