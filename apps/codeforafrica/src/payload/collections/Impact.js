import image from "../fields/image";
import richText from "../fields/richText";

const Impact = {
  slug: "impact",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "value"],
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
