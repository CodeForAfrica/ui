import { deepmerge } from "@mui/utils";
import { Field } from "payload";

import populateFullTitle from "./populateFullTitle";

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
