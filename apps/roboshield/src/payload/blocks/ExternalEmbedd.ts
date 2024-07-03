import { Block } from "payload/types";

export const ExternalEmbedd: Block = {
  slug: "externalEmbedd",
  labels: {
    singular: "External Embedd",
    plural: "External Embedd",
  },
  fields: [
    {
      name: "externalEmbeddFields",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "embedType",
              type: "radio",
              defaultValue: "url",
              options: [
                {
                  label: "URL",
                  value: "url",
                },
                {
                  label: "Code",
                  value: "code",
                },
              ],
            },
          ],
        },
        {
          name: "url",
          label: "URL",
          type: "text",
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.embedType === "url",
          },
        },
        {
          name: "caption",
          type: "text",
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.embedType === "url",
          },
        },
        {
          name: "code",
          type: "code",
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.embedType === "code",
          },
        },
      ],
    },
  ],
};
