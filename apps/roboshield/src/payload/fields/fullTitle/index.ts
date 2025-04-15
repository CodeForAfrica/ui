import { deepmerge } from "@mui/utils";

import populateFullTitle from "./populateFullTitle";
import { Field } from "payload";

interface Args {
  overrides?: Partial<Field>;
}
function fullTitle(args: Args): Field {
  const { overrides = undefined } = args ?? {};
  const fullTitleResult = {
    name: "fullTitle",
    type: "text",
    hooks: {
      beforeChange: [populateFullTitle],
    },
    /*admin: {
      components: {
        Field: () => null,
      },
    },*/
  };

  return deepmerge(fullTitleResult, overrides) as Field;
}

export default fullTitle;
