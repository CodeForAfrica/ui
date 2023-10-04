import image from "../fields/image";
import richText from "../fields/richText";

const Impact = {
  slug: "impact",
  admin: {
    defaultColumns: ["title", "value", "updatedAt"],
    enableRichTextLink: false,
    group: "Organisation",
    useAsTitle: "title",
  },
  access: {
    read: () => true,
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
    }),
    {
      name: "value",
      type: "number",
      min: 1,
      required: true,
      localized: true,
    },
    image({
      overrides: {
        name: "icon",
        required: true,
        localized: true,
      },
    }),
  ],
};
export default Impact;
