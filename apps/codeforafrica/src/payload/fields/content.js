import { deepmerge } from "@mui/utils";

import ExternalEmbed from "../blocks/ExternalEmbed";
import MediaBlock from "../blocks/MediaBlock";
import RichText from "../blocks/RichText";

const content = (overrides) =>
  deepmerge(
    {
      name: "content",
      type: "blocks",
      blocks: [RichText, MediaBlock, ExternalEmbed],
      localized: true,
    },
    overrides,
  );

export default content;
