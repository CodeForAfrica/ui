import { image, richText } from "@/commons-ui/payload/fields";

import colorSettingsField from "../fields/colorSettingsField";

const WhereWeWork = {
  slug: "where-we-work",
  imageURL: "/images/cms/blocks/where-we-work.png",
  imageAltText: "Map with title and description.",
  labels: {
    singular: {
      en: "Where We Work",
    },
    plural: {
      en: "Where We Work",
    },
  },
  fields: [
    colorSettingsField({
      backgroundOverrides: {
        defaultValue: "#CDCDCD",
      },
      textOverrides: {
        defaultValue: "#000000",
      },
    }),
    {
      name: "title",
      type: "text",
      required: true,
      label: { en: "Title" },
      defaultValue: "Where we work",
      localized: true,
      admin: {
        description: "The title of the where we work block.",
      },
    },
    richText({
      name: "description",
      required: true,
      label: { en: "Description" },
      localized: true,
      admin: {
        description: "A brief description of the where we work block.",
      },
    }),
    image({
      overrides: {
        name: "image",
        required: true,
        localized: true,
      },
    }),
  ],
};

export default WhereWeWork;
