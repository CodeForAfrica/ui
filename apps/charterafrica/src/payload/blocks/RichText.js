import blockFields from "../fields/blockFields";
import richText from "../fields/richText";

const RichText = {
  slug: "richText",
  fields: [
    blockFields({
      name: "richTextBlockFields",
      fields: [richText({ name: "content" })],
    }),
  ],
};

export default RichText;
