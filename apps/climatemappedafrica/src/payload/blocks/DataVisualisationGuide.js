import image from "../fields/image";

const DataVisualisationGuide = {
  slug: "data-visualisation-guide",
  imageURL: "/images/cms/blocks/data-visualisation-guide.png",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        image({
          overrides: {
            required: true,
          },
        }),
        {
          name: "description",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default DataVisualisationGuide;
