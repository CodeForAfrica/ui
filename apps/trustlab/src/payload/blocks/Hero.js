import { richText, image, linkArray } from "@commons-ui/payload";

import colorSettingsField from "../fields/colorSettingsField";

const Hero = {
  slug: "hero",
  imageURL: "/images/cms/blocks/hero.png",
  imageAltText: "Used in homepage.",
  fields: [
    {
      name: "slides",
      type: "array",
      label: { en: "Slides" },

      fields: [
        colorSettingsField({
          backgroundOverrides: {
            defaultValue: "#F0F0F5",
          },
          textOverrides: {
            defaultValue: "#000000",
          },
        }),
        richText({
          name: "title",
          required: true,
        }),
        richText({
          name: "description",
          admin: {
            description: "A brief description of the slide content.",
          },
        }),
        image({
          overrides: {
            required: true,
          },
        }),
        {
          name: "imagePosition",
          type: "select",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
          defaultValue: "right",
        },
        {
          name: "buttons",
          type: "group",
          fields: [
            colorSettingsField({
              backgroundOverrides: {
                defaultValue: "#F0F0F5",
              },
              textOverrides: {
                defaultValue: "#000000",
              },
            }),
            linkArray({
              overrides: {
                name: "links",
                maxRows: 2,
                labels: {
                  singular: {
                    en: "Button",
                  },
                  plural: {
                    en: "Buttons",
                  },
                },
              },
            }),
          ],
        },
        {
          name: "divider",
          type: "checkbox",
          label: "Show divider below slide",
          localized: true,
          defaultValue: false,
        },
      ],
    },
  ],
};

export default Hero;
