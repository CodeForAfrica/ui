import { deepmerge } from "@mui/utils";

import ColumnSelect, { validate } from "./ColumnsSelect";

function airtableColumnSelect({ tableField, ...overrrides }) {
  const defaults = {
    required: true,
    type: "text",
    validate: validate(tableField),
    admin: {
      description: () =>
        "Enter Airtable Base above and Table to select a column from",
      components: {
        Field: ColumnSelect({ tableField }),
      },
    },
  };
  return deepmerge(defaults, overrrides);
}

export default airtableColumnSelect;
