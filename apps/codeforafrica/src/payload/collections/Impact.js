import image from "../fields/image";

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
    {
      name: "description",
      label: "Description",
      type: "text",
      required: true,
    },
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
        required: true,
      },
    }),
  ],
};
export default Impact;
