import { deepmerge } from "@mui/utils";

const simpleLabel = (overrides = {}) => {
  const basicSimpleLabel = {
    name: "basicLabel",
    type: "text",
    required: true,
    localized: true,
    admin: {
      width: "50%",
    },
  };

  return deepmerge(basicSimpleLabel, overrides);
};

export default simpleLabel;
