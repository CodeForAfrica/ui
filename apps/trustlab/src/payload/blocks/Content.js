import { richText } from "@commons-ui/payload";

import colorSettingsField from "../fields/colorSettingsField";

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

export default Content;
