import { Block } from "payload";
import { RichText } from "./RichText";
import { MediaBlock } from "./MediaBlock";
import { ExternalEmbed } from "./ExternalEmbed";

export const Content: Block = {
  slug: "content",
  labels: {
    singular: "Content",
    plural: "Content",
  },
  imageURL: "/images/cms/blocks/roboshield/blog.png",
  imageAltText: "Used in About page. Allows addition of blog like content",
  fields: [
    {
      type: "blocks",
      name: "content",
      blocks: [RichText, MediaBlock, ExternalEmbed],
    },
  ],
};
