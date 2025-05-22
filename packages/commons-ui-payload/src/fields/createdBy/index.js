import { deepmerge } from "@mui/utils";

import { populatCreatedBy } from "./hooks/populateCreatedBy";

const createdBy = ({ overrides = {} } = {}) => {
  const field = {
    name: "createdBy",
    type: "relationship",
    relationTo: "users",
    hasMany: false,
    hidden: true,
    hooks: {
      beforeChange: [populatCreatedBy],
    },
    admin: {
      position: "sidebar",
      readOnly: true,
    },
  };
  return deepmerge(field, overrides);
};

export default createdBy;
