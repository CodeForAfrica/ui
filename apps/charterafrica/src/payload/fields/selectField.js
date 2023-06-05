import { deepmerge } from "@mui/utils";

const selectField = (overrides = {}) => {
  const basicSelectField = {
    name: "select",
    type: "select",
    unique: true,
    required: true,
  };

  return deepmerge(basicSelectField, overrides);
};

export default selectField;
