import { deepmerge } from "@mui/utils";

const filterBar = (overrides = {}) => {
  const basicFilterBar = {
    name: "filterBar",
    type: "group",
    admin: {
      hideGutter: true,
    },
  };

  return deepmerge(basicFilterBar, overrides);
};

export default filterBar;
