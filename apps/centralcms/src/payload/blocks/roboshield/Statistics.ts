import { Block } from "payload";
import image from "@/custom-fields/image";

export const Statistics: Block = {
  slug: "statistics",
  labels: {
    singular: "Statistics",
    plural: "Statistics",
  },
  imageURL: "/images/cms/blocks/roboshield/statistics.png",
  imageAltText: "Used in About page.",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
      defaultValue: "Statistics",
    },
    {
      name: "statistics",
      type: "array",
      label: "Statistics",
      labels: {
        singular: "Statistic",
        plural: "Statistics",
      },
      fields: [
        {
          name: "name",
          type: "text",
          label: "Name",
          required: true,
        },
        {
          name: "value",
          type: "text",
          label: "Value",
          required: true,
        },
        {
          name: "description",
          type: "richText",
          label: "Description",
          required: true,
        },
        image({
          overrides: {
            name: "icon",
            localized: true,
            admin: {
              description:
                "An icon to represent this statistic. SVG format is recommended.",
            },
          },
        }),
      ],
    },
  ],
};
