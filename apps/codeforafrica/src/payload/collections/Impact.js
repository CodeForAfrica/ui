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
      label: "Title",
      type: "text",
      required: true,
    },
    richText({
      name: "description",
    }),
    {
      name: "value",
      label: "Value",
      type: "number",
      required: true,
      min: 1,
    },
    image({
      overrides: {
        name: "icon",
        label: "Icon",
        required: true,
      },
    }),
  ],
};
export default Impact;
