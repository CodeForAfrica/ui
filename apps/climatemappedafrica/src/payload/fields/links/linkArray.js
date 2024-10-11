import { deepmerge } from "@mui/utils";

import link from "./link";

/**
 * array field consisting of link fields .
 */
function linkArray(args) {
  const { linkConfig, overrides = {} } = args ?? {};
  const generatedLinkArray = {
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

  return deepmerge(generatedLinkArray, overrides);
}

export default linkArray;
