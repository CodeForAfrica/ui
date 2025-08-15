import { richText, image } from "@/commons-ui/payload/fields";

const IntelligenceBriefings = {
  slug: "intelligence-briefings",
  imageURL: "/images/cms/blocks/intelligence-briefings.png",
  imageAltText: "Intelligence Briefings",
  labels: {
    singular: {
      en: "Intelligence Briefing",
    },
    plural: {
      en: "Intelligence Briefings",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      required: true,
    },
    richText({
      name: "description",
      localized: true,
      required: false,
    }),
    {
      name: "briefs",
      type: "array",
      minRows: 3,
      maxRows: 3,
      admin: {
        description: "Add Intelligence Briefing Briefs",
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
          required: false,
        }),
      ],
    },
  ],
};

export default IntelligenceBriefings;
