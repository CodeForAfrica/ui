import { deepmerge } from "@mui/utils";

const richText = (
  overrides,
  additions = {
    elements: [],
    leaves: [],
  }
) =>
  deepmerge(
    {
      name: "richText",
      type: "richText",
      required: true,
      admin: {
        elements: [...(additions.elements || [])],
        leaves: [...(additions.leaves || [])],
        // TODO: Add upload
      },
    },
    overrides
  );

export default richText;
