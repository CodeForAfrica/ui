import image from "../fields/image";
import richText from "../fields/richText";
import slug from "../fields/slug";

const GuidingPrinciples = {
  slug: "guiding-principles",
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    enableRichTextLink: false,
    group: "Organisation",
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
    slug({ fieldToUse: "title" }),
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
