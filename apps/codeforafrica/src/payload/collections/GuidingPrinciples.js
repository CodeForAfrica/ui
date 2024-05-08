import { slateEditor } from "@payloadcms/richtext-slate";

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
      type: "text",
      required: true,
      localized: true,
    },
    slug({ fieldToUse: "title" }),
    image({
      overrides: {
        name: "icon",
        required: true,
        localized: true,
      },
    }),
    richText({
      name: "description",
      required: true,
      localized: true,
      editor: slateEditor({}),
    }),
  ],
};

export default GuidingPrinciples;
