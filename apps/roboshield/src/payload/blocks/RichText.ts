import { Block } from "payload/types";
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
