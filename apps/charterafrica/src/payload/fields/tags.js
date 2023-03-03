import { deepmerge } from "@mui/utils";

const tags = (overrides) => {
  const { collectionType, ...restArgs } = overrides;
  const field = {
    name: "tags",
    required: true,
    type: "relationship",
    relationTo: "tag",
    hasMany: true,
    filterOptions: () => {
      return {
        collectionType: { equals: collectionType },
      };
    },
  };
  return deepmerge(field, restArgs);
};

export default tags;
