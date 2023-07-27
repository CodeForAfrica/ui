import { deepmerge } from "@mui/utils";

const blockFields = ({ name, fields, overrides }) =>
  deepmerge(
    {
      name,
      label: false,
      type: "group",
      admin: {
        hideGutter: true,
        style: {
          margin: 0,
          padding: 0,
        },
      },
      fields,
    },
    overrides
  );

export default blockFields;
