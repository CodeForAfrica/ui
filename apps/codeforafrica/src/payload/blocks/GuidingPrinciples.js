import image from "../fields/image";
import richText from "../fields/richText";

const GuidingPrinciples = {
  slug: "guiding-principles",
  imageURL: "/images/cms/blocks/guiding_principles.jpg",
  imageAltText: "Guiding Principles",
  fields: [
    {
      name: "title",
      label: {
        en: "Title",
      },
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "list",
      label: "Guiding Principles",
      type: "array",
      fields: [
        {
          name: "title",
          label: {
            en: "Title",
          },
          type: "text",
          localized: true,
          required: true,
        },
        image({
          overrides: {
            name: "icon",
            required: true,
          },
        }),
        richText({
          name: "description",
          label: {
            en: "Description",
          },
          localized: true,
          required: true,
        }),
      ],
    },
  ],
};

export default GuidingPrinciples;
