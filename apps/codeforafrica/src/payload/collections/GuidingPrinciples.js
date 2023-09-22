import image from "../fields/image";
import richText from "../fields/richText";

const GuidingPrinciples = {
  slug: "guiding-principles",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Title",
      },
      type: "text",
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
      required: true,
    }),
  ],
};

export default GuidingPrinciples;
