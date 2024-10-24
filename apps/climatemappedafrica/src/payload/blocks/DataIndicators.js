import { slateEditor } from "@payloadcms/richtext-slate";

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
    richText({
      name: "title",
      required: true,
      label: "Title",
      editor: slateEditor({
        admin: {
          elements: ["link"],
          leaves: ["bold", "code", "italic", "underline"],
        },
      }),
      localized: true,
    }),
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
          localized: true,
        },
        richText({
          name: "description",
          required: true,
          label: "Description",
          localized: true,
          editor: slateEditor({
            admin: {
              elements: ["link"],
              leaves: ["bold", "code", "italic", "underline"],
            },
          }),
        }),
        {
          type: "collapsible",
          label: "Icon",
          fields: [
            image({
              overrides: {
                name: "primaryIcon",
                required: true,
                admin: {
                  description: "Shown by default",
                },
              },
            }),
            image({
              overrides: {
                name: "secondaryIcon",
                localized: true,
                admin: {
                  description: "Shown when active",
                },
              },
            }),
          ],
        },
      ],
    },
  ],
};

export default DataIndicators;
