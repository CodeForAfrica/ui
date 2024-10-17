import { slateEditor } from "@payloadcms/richtext-slate";

import richText from "../fields/richText";

const Summary = {
  slug: "summary",
  imageURL: "/images/payload/blocks/summary.jpg",
  fields: [
    {
      name: "title",
      label: {
        en: "Title",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "subtitle",
      label: {
        en: "Subtitle",
      },
      type: "text",
      required: true,
      localized: true,
    },
    richText({
      name: "content",
      label: {
        en: "Content",
      },
      editor: slateEditor({
        admin: {
          elements: ["link", "ol", "ul", "indent"],
          leaves: ["bold", "code", "italic", "underline"],
        },
      }),
      required: true,
      localized: true,
    }),
  ],
};

export default Summary;
