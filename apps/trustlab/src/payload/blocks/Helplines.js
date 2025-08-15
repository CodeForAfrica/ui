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
        linkGroup({
          overrides: {
            name: "link",
            label: "Rapid Response Link",
          },
        }),
      ],
    },
  ],
};

export default Helplines;
