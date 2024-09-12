import blockFields from "@/payload/fields/blockFields";
import richText from "@/payload/fields/RichText";
import { Block } from "payload";

const RichText: Block = {
  slug: "richText",
  fields: [
    blockFields({
      name: "richTextBlockFields",
      fields: [
        richText({
          name: "content",
          required: true,
        }),
      ],
    }),
  ],
};

export default RichText;
