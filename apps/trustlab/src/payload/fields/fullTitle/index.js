import { deepmerge } from "@mui/utils";

import populateFullTitle from "./populateFullTitle";

function fullTitle({ overrides = undefined } = {}) {
  const fullTitleResult = {
    name: "fullTitle",
    type: "text",
    admin: {
      hidden: true,
    },
    hooks: {
      beforeChange: [populateFullTitle],
    },
  };

  return deepmerge(fullTitleResult, overrides);
}

export default fullTitle;
