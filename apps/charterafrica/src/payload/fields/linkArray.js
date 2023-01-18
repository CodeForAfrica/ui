import { deepmerge } from "@mui/utils";

import link from "./link";

/**
 * array field consisting of link fields .
 */
function linkArray({ linkConfig, overrides = {} } = {}) {
  const generatedLinkGroup = {
    name: "links",
    type: "array",
    fields: [link(linkConfig)],
    admin: {
      initCollapsed: true,
      components: {
        RowLabel: ({ data }) => {
          return data?.label || data?.reference?.title || data?.url || data?.id;
        },
      },
    },
  };

  return deepmerge(generatedLinkGroup, overrides);
}

export default linkArray;
