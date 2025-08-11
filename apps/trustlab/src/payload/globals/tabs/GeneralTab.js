import { image, richText } from "@commons-ui/payload";

const GeneralTab = {
  label: "General",
  fields: [
    {
      type: "collapsible",
      label: "Title & Description",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
        richText({
          name: "description",
          required: true,
          localized: true,
        }),
        {
          name: "quickLinksTitle",
          type: "text",
          required: true,
          localized: true,
          defaultValue: "Quick Links",
        },
      ],
    },
    {
      type: "collapsible",
      label: "Logo",
      fields: [
        image({
          overrides: {
            name: "primaryLogo",
            required: true,
            admin: {
              description: "Shown on main navigation bar.",
            },
          },
        }),
        image({
          overrides: {
            name: "secondaryLogo",
            admin: {
              description:
                "Shown on main footer. If not provided, primary logo will be reused.",
            },
          },
        }),
      ],
    },
    {
      type: "collapsible",
      label: "Donors & Sponsors",
      fields: [
        {
          name: "donorTitle",
          type: "text",
          required: true,
          localized: true,
          defaultValue: "Funders",
        },
        {
          name: "funders",
          type: "relationship",
          relationTo: "donors",
          hasMany: true,
          localized: true,
        },
      ],
    },
    {
      type: "collapsible",
      label: "Labels",
      fields: [
        {
          name: "quickLinksLabel",
          type: "text",
          required: true,
          localized: true,
          defaultValue: "Quick Links",
        },
      ],
    },
  ],
};

export default GeneralTab;
