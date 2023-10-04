import { deepmerge } from "@mui/utils";

const tags = (overrides) => {
  const field = {
    name: "tags",
    type: "relationship",
    relationTo: "tag",
    hasMany: true,
    required: true,
  };
  return deepmerge(field, overrides);
};

export default tags;
