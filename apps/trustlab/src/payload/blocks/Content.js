import { richText } from "@commons-ui/payload";

import colorPicker from "../fields/colorPicker";

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
    colorPicker({
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
