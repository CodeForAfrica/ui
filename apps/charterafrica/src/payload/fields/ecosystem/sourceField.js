import { deepmerge } from "@mui/utils";

import airtableColumnSelect from "./airtableColumnSelect";

function sourceField({ tableField, schema, overrides = {} }) {
  const defaultField = {
    type: "group",
    label: { en: "Source", fr: "Source", pt: "Fonte" },
    name: "source",
    fields: [
      airtableColumnSelect({
        tableField,
        schema,
        overrides: {
          name: "url",
          label: { en: "Source URL", fr: "URL de source", pt: "URL da fonte" },
        },
      }),
      airtableColumnSelect({
        tableField,
        schema,
        overrides: {
          name: "type",
          label: {
            en: "Type",
            pt: "Tipo",
          },
        },
      }),
    ],
    admin: {
      hideGutter: true,
    },
  };

  return deepmerge(defaultField, overrides);
}

export default sourceField;
