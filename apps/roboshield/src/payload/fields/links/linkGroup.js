import { deepmerge } from "@mui/utils";

import link from "./link";

/**
 * group field consisting of a link field.
 */
function linkGroup({ linkConfig, overrides = {} } = {}) {
  const generatedLinkGroup = {
    name: "link",
    type: "group",
    required: true,
    fields: [link(linkConfig)],
  };

  return deepmerge(generatedLinkGroup, overrides);
}

export default linkGroup;
