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
                  label: {
                    en: "URL",
                    fr: "URL",
                    pt: "URL",
                  },
                  value: "url",
                },
                {
                  label: {
                    en: "Code",
                    fr: "Code",
                    pt: "Código",
                  },
                  value: "code",
                },
              ],
            },
          ],
        },
        {
          name: "url",
          label: {
            en: "URL",
            fr: "URL",
            pt: "URL",
          },
          type: "text",
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.embedType === "url",
          },
        },
        {
          name: "caption",
          label: {
            en: "Caption",
            fr: "Légende",
            pt: "Rubrica",
          },
          type: "text",
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.embedType === "url",
          },
        },
        {
          name: "code",
          label: {
            en: "Code",
            fr: "Code",
            pt: "Código",
          },
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
