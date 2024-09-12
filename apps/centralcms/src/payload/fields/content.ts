import { deepmerge } from "@mui/utils";

import ExternalEmbed from "@/payload/blocks/codeforafrica/ExternalEmbed";
import MediaBlock from "@/payload/blocks/codeforafrica/MediaBlock";
import RichText from "@/payload/blocks/codeforafrica/RichText";
import { Field } from "payload";

const content = (overrides): Field =>
  deepmerge(
    {
      name: "content",
      type: "blocks",
      blocks: [RichText, MediaBlock, ExternalEmbed],
    },
    overrides,
  ) as Field;

export default content;
