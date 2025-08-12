import { richText, image } from "@/commons-ui/payload/fields";

const RapidResponse = {
  slug: "rapid-response",
  imageURL: "/images/cms/blocks/rapid-response.png",
  imageAltText: "Rapid Response",
  labels: {
    singular: {
      en: "Rapid Response",
    },
    plural: {
      en: "Rapid Responses",
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
      admin: {
        description: "Add Rapid Response Briefs",
      },
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
      ],
    },
  ],
};

export default RapidResponse;
