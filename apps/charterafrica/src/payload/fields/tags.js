import { deepmerge } from "@mui/utils";

function tags(overrides) {
  const field = {
    name: "tags",
    required: true,
    type: "relationship",
    relationTo: "tag",
    hasMany: true,
  };
  return deepmerge(field, overrides);
}

export default tags;
