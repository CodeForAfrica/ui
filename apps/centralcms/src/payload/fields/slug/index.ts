import { deepmerge } from "@mui/utils";

import formatSlug from "./formatSlug";
import { Field } from "payload";

function slug({ fieldToUse = "title", overrides = undefined } = {}): Field {
  const slugResult: Field = {
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
