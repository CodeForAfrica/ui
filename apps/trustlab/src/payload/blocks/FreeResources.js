import { richText, image } from "@/commons-ui/payload/fields";

const FreeResources = {
  slug: "free-resources",
  imageURL: "/images/cms/blocks/free-resources.png",
  imageAltText: "Free Resources",
  labels: {
    singular: {
      en: "Free Resource",
    },
    plural: {
      en: "Free Resources",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "resources",
      type: "array",
      minRows: 4,
      maxRows: 4,
      admin: {
        description: "Add Free Resources",
      },
      fields: [
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
        image({
          overrides: {
            name: "icon",
            required: true,
          },
        }),
      ],
    },
  ],
};

export default FreeResources;
