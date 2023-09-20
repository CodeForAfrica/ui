import { deepmerge } from "@mui/utils";

const impacts = (overrides) =>
  deepmerge(
    {
      name: "impacts",
      type: "relationship",
      relationTo: "impact",
      hasMany: true,
    },
    overrides,
  );

export default impacts;
