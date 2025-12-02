import { richText, image, linkGroup } from "@/commons-ui/payload/fields";

const Helplines = {
  slug: "helplines",
  imageURL: "/images/cms/blocks/helplines.png",
  imageAltText: "Helpline",
  labels: {
    singular: {
      en: "Helpline",
    },
    plural: {
      en: "Helplines",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "displayType",
      type: "select",
      label: { en: "Display Type" },
      defaultValue: "row",
      options: [
        { label: { en: "1 Row" }, value: "row" },
        { label: { en: "Listed (line by line)" }, value: "list" },
      ],
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
        {
          name: "useEmbedCode",
          type: "checkbox",
          label: "Use Embed Code",
          defaultValue: false,
        },
        {
          name: "embedCode",
          type: "code",
          admin: {
            language: "html",
            condition: (_, siblingData) => siblingData?.useEmbedCode,
          },
        },
        {
          name: "embedButtonLabel",
          type: "text",
          admin: {
            condition: (_, siblingData) => siblingData?.useEmbedCode,
          },
          defaultValue: "View",
        },
        {
          name: "embedCloseLabel",
          type: "text",
          admin: {
            condition: (_, siblingData) => siblingData?.useEmbedCode,
          },
          defaultValue: "Close",
        },
        linkGroup({
          overrides: {
            name: "link",
            label: "Rapid Response Link",
            required: false,
            admin: {
              condition: (_, siblingData) => !siblingData?.useEmbedCode,
            },
          },
        }),
      ],
    },
  ],
};

export default Helplines;
