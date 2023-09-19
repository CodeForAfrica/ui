import { deepmerge } from "@mui/utils";

const authors = (overrides) =>
  deepmerge(
    {
      name: "impacts",
      type: "relationship",
      relationTo: "impact",
      hasMany: true,
    },
    overrides,
  );

export default authors;
