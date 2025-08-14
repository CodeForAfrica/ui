import { richText, image, linkGroup } from "@/commons-ui/payload/fields";

const Resources = {
  slug: "free-resources",
  imageURL: "/images/cms/blocks/free-resources.png",
  imageAltText: "Helplines",
  labels: {
    singular: {
      en: "Resource",
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
      name: "resources",
      type: "array",
      minRows: 4,
      maxRows: 4,
      admin: {
        description: "Add Helplines",
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
        linkGroup({
          overrides: {
            name: "link",
            label: "Resource Link",
          },
        }),
      ],
    },
  ],
};

export default Resources;
