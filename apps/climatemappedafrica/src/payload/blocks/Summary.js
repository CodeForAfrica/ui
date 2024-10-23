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
          elements: [
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "blockquote",
            "link",
            "ol",
            "ul",
            "indent",
            "relationship",
            "upload",
            "textAlign",
          ],
          leaves: ["bold", "code", "italic", "strikethrough", "underline"],
          upload: {
            collections: {
              media: {
                fields: [
                  {
                    name: "caption",
                    type: "text",
                    localized: true,
                  },
                ],
              },
            },
          },
        },
      }),
      required: true,
      localized: true,
    }),
  ],
};

export default Summary;
