import { deepmerge } from "@mui/utils";

import populateFullTitle from "./populateFullTitle";
import { Field } from "payload";

type Overrides = {
  overrides?: Partial<Field>;
};

function fullTitle({ overrides = {} }: Overrides = {}): Field {
  const fullTitleResult = {
    name: "fullTitle",
    type: "text",
    hooks: {
      beforeChange: [populateFullTitle],
    },
    admin: {
      components: {
        Field: () => null,
      },
    },
  };

  return deepmerge(fullTitleResult, overrides) as Field;
}

export default fullTitle;
