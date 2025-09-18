import { slug } from "@/commons-ui/payload/fields";

const Forms = {
  slug: "forms",
  labels: { singular: "Form", plural: "Forms" },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slug(),
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "fields",
      type: "array",
      required: true,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "type",
          type: "select",
          options: [
            { label: "Text", value: "text" },
            { label: "Email", value: "email" },
            { label: "Number", value: "number" },
            { label: "Textarea", value: "textarea" },
            { label: "Select", value: "select" },
            { label: "Checkbox", value: "checkbox" },
          ],
          required: true,
        },
        {
          name: "required",
          type: "checkbox",
        },
        {
          name: "options",
          type: "array",
          admin: {
            condition: (data, siblingData) => siblingData?.type === "select",
          },
          fields: [
            { name: "label", type: "text" },
            { name: "value", type: "text" },
          ],
        },
      ],
    },
  ],
};

export default Forms;
