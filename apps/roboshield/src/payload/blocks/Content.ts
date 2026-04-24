import type { Block } from "payload";

import { ExternalEmbed } from "./ExternalEmbed";
import { MediaBlock } from "./MediaBlock";
import { RichText } from "./RichText";

export const Content: Block = {
  slug: "content",
  labels: {
    singular: "Content",
    plural: "Content",
  },
  imageURL: "/images/cms/blocks/blog.png",
  imageAltText: "Used in About page. Allows addition of blog like content",
  fields: [
    {
      type: "blocks",
      name: "content",
      blocks: [RichText, MediaBlock, ExternalEmbed],
    },
  ],
};
