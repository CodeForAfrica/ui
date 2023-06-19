import { deepmerge } from "@mui/utils";

function filterBar({ overrides } = {}) {
  const generatedFilterBar = {
    name: "filterBar",
    type: "group",
    admin: {
      hideGutter: true,
    },
  };
  return deepmerge(generatedFilterBar, overrides);
}

export default filterBar;
