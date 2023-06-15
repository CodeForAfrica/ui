import { deepmerge } from "@mui/utils";

const filterBar = (overrides) =>
  deepmerge(
    {
      name: "filterBar",
      type: "group",
      admin: {
        hideGutter: true,
      },
    },
    overrides
  );

export default filterBar;
