import airtableColumnSelect from "./airtableColumnSelect";

function sourceField({ tableField }) {
  return {
    type: "group",
    label: { en: "Source", fr: "Source", pt: "Fonte" },
    name: "source",
    fields: [
      airtableColumnSelect({
        tableField,
        name: "url",
        label: { en: "Source URL", fr: "URL de source", pt: "URL da fonte" },
      }),
      airtableColumnSelect({
        tableField,
        name: "type",
        label: { en: "Source", fr: "Source", pt: "Fonte" },
      }),
    ],
  };
}

export default sourceField;
