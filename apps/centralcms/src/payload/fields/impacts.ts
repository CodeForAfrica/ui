import { deepmerge } from "@mui/utils";
import { Field } from "payload";

const impacts = (overrides): Field =>
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
