import { linkGroup, richText } from "@commons-ui/payload";

const ContentActionBanner = {
  slug: "content-action-banner",
  labels: {
    singular: "Content Action Banner",
    plural: "Content Action Banners",
  },
  imageURL: "/images/cms/blocks/content-action-banner.png",
  fields: [
    richText({
      name: "content",
      required: true,
      localized: true,
    }),
    {
      name: "backgroundColor",
      type: "text",
      label: { en: "Background Color" },
      admin: {
        description:
          "Enter a valid CSS color (e.g., #FFDE59, rgb(255, 222, 89))",
      },
    },
    {
      name: "textColor",
      type: "text",
      label: { en: "Text Color" },
      defaultValue: "#000000",
      admin: {
        description: "Enter a valid CSS color (e.g., #000000, rgb(0, 0, 0))",
      },
    },
    {
      name: "button",
      type: "group",
      label: { en: "Button Styling" },
      fields: [
        {
          name: "borderColor",
          type: "text",
          label: { en: "Border Color" },
          defaultValue: "#000000",
          admin: {
            description: "Enter a valid CSS color for the button border",
          },
        },
      ],
    },
    linkGroup({
      overrides: {
        name: "buttonLink",
        label: { en: "Button Link" },
      },
    }),
  ],
};

export default ContentActionBanner;
