import blockFields from "../fields/blockFields";

const ExternalEmbed = {
  slug: "external-embed",
  fields: [
    blockFields({
      name: "embedBlockFields",
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
    }),
  ],
};

export default ExternalEmbed;
