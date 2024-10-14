import image from "../fields/image";
import richText from "../fields/richText";

const DataIndicators = {
  slug: "data-indicators",
  imageURL: "/images/cms/blocks/data-indicators.png",
  imageAltText: "Used in homepage",
  labels: {
    singular: "Data Indicator",
    plural: "Data Indicators",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "indicators",
      type: "array",
      label: "Indicators",
      required: true,
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title",
          required: true,
        },
        richText({
          name: "description",
          required: true,
          label: "Description",
        }),
        image({
          overrides: {
            name: "icon",
            required: true,
          },
        }),
      ],
    },
  ],
};

export default DataIndicators;
