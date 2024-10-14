import { slateEditor } from "@payloadcms/richtext-slate";

import image from "../fields/image";
import richText from "../fields/richText";

const PageHero = {
  slug: "page-hero",
  fields: [
    {
      name: "overline",
      label: {
        en: "Overline",
      },
      type: "text",
      required: true,
      localized: true,
    },
    richText({
      name: "title",
      label: {
        en: "Title",
      },
      editor: slateEditor({
        admin: {
          elements: [],
          leaves: ["bold"],
        },
      }),
      required: true,
      localized: true,
    }),
    richText({
      name: "subtitle",
      label: {
        en: "Subtitle",
      },
      editor: slateEditor({
        admin: {
          elements: ["link"],
          leaves: ["bold", "code", "italic", "underline"],
        },
      }),
      required: true,
      localized: true,
    }),
    image({
      overrides: {
        name: "background",
        required: true,
      },
    }),
  ],
};

export default PageHero;
