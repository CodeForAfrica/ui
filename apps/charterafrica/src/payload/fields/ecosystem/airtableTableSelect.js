import { deepmerge } from "@mui/utils";
import { Select } from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement, useMemo } from "react";

function tablesToOptions(tables) {
  return tables?.map((item) => ({ value: item.id, label: item.name })) || [];
}

const getOptions = async (schema) => {
  const { tables } = schema;
  return tablesToOptions(tables);
};

export const validateTableSelect =
  (schema) =>
  async (value, { hasMany, required, t }) => {
    const options = await getOptions(schema);
    return select(value, { hasMany, options, required, t });
  };

function AirtableTableSelect(schema) {
  return function ATSelect(props) {
    const { tables } = schema;
    const options = useMemo(() => tablesToOptions(tables), [tables]);
    return createElement(Select, { ...props, options });
  };
}

function airtableTableSelect({ schema, ...overrides }) {
  const defaultSelect = {
    type: "text",
    validate: validateTableSelect(schema),
    required: true,
    admin: {
      components: {
        Field: AirtableTableSelect(schema),
      },
      description: () => "Select Airtable Base above to see available tables",
    },
  };

  return deepmerge(defaultSelect, overrides);
}

export default airtableTableSelect;
