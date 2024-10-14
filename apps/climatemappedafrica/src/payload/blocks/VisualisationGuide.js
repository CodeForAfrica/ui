import image from "../fields/image";

const VisualisationGuide = {
  slug: "visualisation-guide",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
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

export default VisualisationGuide;
