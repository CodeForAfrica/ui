import { deepmerge } from "@mui/utils";
import { type Field } from "payload";

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
 * group field consisting of a link field.
 */
function linkGroup(args: Args) {
  const { linkConfig, overrides = {} } = args ?? {};
  const generatedLinkGroup = {
    name: "link",
    type: "group",
    required: true,
    fields: [link(linkConfig)],
  };

  return deepmerge(generatedLinkGroup, overrides);
}

export default linkGroup;
