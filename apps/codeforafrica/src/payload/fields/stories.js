import { deepmerge } from "@mui/utils";

const stories = (overrides) =>
  deepmerge(
    {
      name: "stories",
      type: "relationship",
      relationTo: "story",
      hasMany: true,
    },
    overrides,
  );

export default stories;
