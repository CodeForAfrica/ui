import { richText, image } from "@/commons-ui/payload/fields";

const AirtableEmbed = {
  slug: "airtable-embed",
  labels: {
    singular: {
      en: "Airtable Embed",
    },
    plural: {
      en: "Airtable Embeds",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "briefs",
      type: "array",
      minRows: 3,
      maxRows: 3,
      fields: [
        image({
          overrides: {
            name: "icon",
            required: true,
          },
        }),
        {
          name: "title",
          type: "text",
          required: true,
        },
        richText({
          name: "description",
          localized: true,
          required: true,
        }),
        {
          name: "embedCode",
          type: "code",
          required: true,
          admin: {
            language: "html",
          },
        },
        {
          name: "embedButtonLabel",
          type: "text",
          defaultValue: "View",
        },
      ],
    },
  ],
};

export default AirtableEmbed;
