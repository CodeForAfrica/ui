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
          name: "image",
          required: true,
        }),
        colorSettingsField({
          backgroundOverrides: {
            defaultValue: "#F0F0F5",
          },
          textOverrides: {
            defaultValue: "#000000",
          },
        }),
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
      ],
    },
  ],
};

export default Hero;
