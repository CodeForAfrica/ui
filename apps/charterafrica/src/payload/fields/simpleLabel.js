import { deepmerge } from "@mui/utils";

const simpleLabel = (overrides = {}) => {
  const basicSimpleLabel = {
    name: "label",
    type: "text",
    required: true,
    localized: true,
  };

  return deepmerge(basicSimpleLabel, overrides);
};

export default simpleLabel;
