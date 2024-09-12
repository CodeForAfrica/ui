import { deepmerge } from "@mui/utils";
import { Field } from "payload";

const tags = (overrides): Field => {
  const field = {
    name: "tags",
    type: "relationship",
    relationTo: "tag",
    hasMany: true,
    required: true,
  };
  return deepmerge(field, overrides) as Field;
};

export default tags;
