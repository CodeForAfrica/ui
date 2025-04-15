import type { Block } from "payload";
import richText from "../fields/richText";

export const RichText: Block = {
  slug: "richtext",
  labels: {
    singular: "Rich Text",
    plural: "Rich Text",
  },
  fields: [
    richText({
      name: "content",
      required: true,
    }),
  ],
};
