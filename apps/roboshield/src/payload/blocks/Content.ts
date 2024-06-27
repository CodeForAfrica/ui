import { Block } from "payload/types";
import { slateEditor } from "@payloadcms/richtext-slate";

export const Content: Block = {
  slug: "content",
  labels: {
    singular: "Content",
    plural: "Content",
  },
  fields: [
    {
      name: "content",
      type: "richText",
      label: "Content",
      editor: slateEditor({
        admin: {
          elements: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "link",
            "ol",
            "ul",
            "indent",
          ],
        },
      }),
    },
  ],
};
