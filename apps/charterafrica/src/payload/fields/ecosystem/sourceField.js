import { deepmerge } from "@mui/utils";

import source from "../source";

import airtableColumnSelect from "./airtableColumnSelect";

function sourceField({ tableField, overrides = {} }) {
  const defaultField = {
    type: "group",
    label: { en: "Source", fr: "Source", pt: "Fonte" },
    name: "source",
    fields: [
      airtableColumnSelect({
        tableField,
        overrides: {
          name: "url",
          label: { en: "Source URL", fr: "URL de source", pt: "URL da fonte" },
        },
      }),
      source({
        name: "type",
        label: {
          en: "Type",
          pt: "Tipo",
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
