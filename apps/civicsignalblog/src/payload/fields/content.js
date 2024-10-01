import { deepmerge } from "@mui/utils";

import ExternalEmbed from "#civicsignalblog/payload/blocks/ExternalEmbed";
import MediaBlock from "#civicsignalblog/payload/blocks/MediaBlock";
import RichText from "#civicsignalblog/payload/blocks/RichText";

const content = (overrides) =>
  deepmerge(
    {
      name: "content",
      type: "blocks",
      blocks: [RichText, MediaBlock, ExternalEmbed],
    },
    overrides,
  );

export default content;
