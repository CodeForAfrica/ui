import { deepmerge } from "@mui/utils";

const richText = (overrides) =>
  deepmerge(
    {
      name: "richText",
      type: "richText",
      required: true,
    },
    overrides
  );

export default richText;
