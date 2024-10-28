import { slateEditor } from "@payloadcms/richtext-slate";

import image from "../../fields/image";
import richText from "../../fields/richText";

const Tutorial = {
  label: "Tutorial",
  fields: [
    {
      name: "tutorialPanel",
      label: {
        en: "Tutorial Panel",
      },
      type: "group",
      localized: true,
      fields: [
        {
          name: "items",
          label: {
            en: "Items",
          },
          type: "array",
          localized: true,
          required: true,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: ({ data, index }) => {
                return data?.title || `Item ${String(index).padStart(2, "0")}`;
              },
            },
          },
          fields: [
            {
              name: "title",
              label: {
                en: "Title",
              },
              type: "text",
              localized: true,
              required: true,
            },
            richText({
              name: "description",
              label: {
                en: "Description",
              },
              editor: slateEditor({
                admin: {
                  elements: [
                    "h3",
                    "h4",
                    "h5",
                    "h6",
                    "link",
                    "ol",
                    "ul",
                    "indent",
                  ],
                  leaves: ["bold", "code", "italic", "underline"],
                },
              }),
              required: true,
              localized: true,
            }),
            {
              name: "selector",
              label: {
                en: "Selector",
              },
              type: "text",
              localized: true,
              required: true,
              admin: {
                description: "CSS selector for the element to highlight",
              },
            },
            image({
              overrides: {
                name: "image",
                required: true,
              },
            }),
          ],
        },
      ],
    },
  ],
};

export default Tutorial;
