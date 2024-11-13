import { slateEditor } from "@payloadcms/richtext-slate";

import richText from "../fields/richText";

const Hero = {
  slug: "hero",
  imageURL: "/images/cms/blocks/hero.png",
  imageAltText: "Used in homepage",
  labels: {
    singular: "Hero",
    plural: "Hero",
  },
  fields: [
    richText({
      name: "title",
      required: true,
      localized: true,
      editor: slateEditor({
        admin: {
          elements: [],
          leaves: ["bold"],
        },
      }),
    }),
    richText({
      name: "subtitle",
      required: true,
      localized: true,
      editor: slateEditor({
        admin: {
          elements: [],
          leaves: ["bold", "code", "italic", "strikethrough", "underline"],
        },
      }),
    }),
    {
      name: "searchLabel",
      type: "text",
      label: "Search Label",
      localized: true,
      required: true,
    },
    {
      name: "searchPlaceholder",
      type: "text",
      label: "Search Placeholder",
      localized: true,
    },
    {
      name: "comment",
      type: "text",
      label: "Comment",
      localized: true,
    },
    {
      name: "averageTemperature",
      type: "text",
      label: "Average Temperature",
      defaultValue: "Average Temperature",
      localized: true,
    },
  ],
};

export default Hero;
