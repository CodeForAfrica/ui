import { link, richText } from "@commons-ui/payload";

const ContentOverview = {
  slug: "content-overview",
  imageURL: "/images/cms/blocks/content-overview.png",
  imageAltText: "Content Overview block.",
  labels: { singular: "Content Overview", plural: "Content Overviews" },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
    },
    richText({ name: "content", required: true, localized: true }),
    {
      name: "card",
      type: "group",
      label: "Info Card",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
          label: "Card Title",
        },
        {
          name: "cardType",
          type: "select",
          defaultValue: "items",
          label: "Card Content Type",
          options: [
            { label: "Key-Value Items", value: "items" },
            { label: "Rich Text", value: "richtext" },
          ],
        },
        {
          name: "items",
          type: "array",
          label: "Items",
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.cardType !== "richtext",
          },
          fields: [
            { name: "fieldLabel", type: "text", label: "Label (optional)" },
            {
              name: "isLink",
              type: "checkbox",
              label: "Is this a link?",
              defaultValue: false,
            },
            {
              name: "value",
              type: "text",
              required: true,
              label: "Value",
              admin: {
                condition: (_, siblingData) => !siblingData?.isLink,
              },
            },
            {
              ...link({ name: "link", label: "Link URL", required: false }),
              admin: {
                condition: (_, siblingData) => siblingData?.isLink === true,
              },
            },
          ],
        },
        richText({
          name: "richContent",
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.cardType === "richtext",
            description: "Rich text content displayed inside the card.",
          },
        }),
      ],
    },
  ],
};

export default ContentOverview;
