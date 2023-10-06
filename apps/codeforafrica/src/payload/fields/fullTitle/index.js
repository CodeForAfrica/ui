import { deepmerge } from "@mui/utils";

import populateFullTitle from "./populateFullTitle";

function fullTitle({ overrides = undefined } = {}) {
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

  return deepmerge(fullTitleResult, overrides);
}

export default fullTitle;
