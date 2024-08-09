import { deepmerge } from "@mui/utils";

import formatSlug from "./formatSlug";

function slug({ fieldToUse = "title", overrides = undefined } = {}) {
  const slugResult = {
    name: "slug",
    type: "text",
    index: true,
    unique: true,
    admin: {
      position: "sidebar",
    },
    hooks: {
      beforeValidate: [formatSlug(fieldToUse)],
    },
  };

  return deepmerge(slugResult, overrides);
}

export default slug;
