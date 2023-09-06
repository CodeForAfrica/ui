import { deepmerge } from "@mui/utils";

import link from "./links/link";
import linkArray from "./links/linkArray";

const linkField = link({
  disableOpenInNewTab: true,
});

function menus(overrides) {
  const defaults = {
    overrides: {
      label: "Menus",
      name: "menus",
      fields: [linkField],
    },
  };
  return linkArray(deepmerge(defaults, overrides));
}

export default menus;
