import { Block } from "payload/types";
import { RichText } from "./RichText";
import { MediaBlock } from "./MediaBlock";
import { ExternalEmbedd } from "./ExternalEmbedd";

export const Content: Block = {
  slug: "content",
  labels: {
    singular: "Content",
    plural: "Content",
  },
  fields: [
    {
      type: "blocks",
      name: "content",
      blocks: [RichText, MediaBlock, ExternalEmbedd],
    },
  ],
};
