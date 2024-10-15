import { slateEditor } from "@payloadcms/richtext-slate";

import image from "../fields/image";

const DataVisualisationGuide = {
  slug: "data-visualisation-guide",
  imageURL: "/images/cms/blocks/data-visualisation-guide.png",
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
          type: "richText",
          required: true,
          editor: slateEditor({
            admin: {
              elements: ["link"],
              leaves: ["bold", "code", "italic", "underline"],
            },
          }),
        },
      ],
    },
  ],
};

export default DataVisualisationGuide;
