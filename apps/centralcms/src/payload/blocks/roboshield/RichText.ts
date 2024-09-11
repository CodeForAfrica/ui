import { Block } from "payload";
import richText from "@/custom-fields/RichText";

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
