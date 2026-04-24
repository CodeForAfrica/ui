import { deepmerge } from "@mui/utils";
import type { Field } from "payload";

import link from "./link";

type LinkConfig = {
  defaultValue: string;
  disableLabel: boolean;
  disableLinkTypeSelection: boolean;
  disableOpenInNewTab: boolean;
  overrides: Partial<Field>;
  required: boolean;
};

interface Args {
  linkConfig?: LinkConfig;
  overrides: Partial<Field>;
}
/**
 * array field consisting of link fields .
 */
function linkArray(args: Args) {
  const { linkConfig, overrides = {} } = args ?? {};
  const generatedLinkArray: Field = {
    name: "links",
    type: "array",
    fields: [link(linkConfig)],
    admin: {
      initCollapsed: true,
      components: {
        RowLabel: "@/roboshield/payload/components/RowLabel.tsx",
      },
    },
  };

  return deepmerge(generatedLinkArray, overrides);
}

export default linkArray;
