import { deepmerge } from "@mui/utils";
import { Select } from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement, useMemo } from "react";

import { schema } from "./airtableBaseSelect";

function tablesToOptions(tables) {
  return tables?.map((item) => ({ value: item.id, label: item.name })) || [];
}

const getOptions = async () => {
  const { tables } = schema;
  return tablesToOptions(tables);
};

export const validateTableSelect = async (
  value,
  { hasMany, required, t, data: { baseId } }
) => {
  const options = await getOptions(baseId);
  return select(value, { hasMany, options, required, t });
};

function AirtableTableSelect(props) {
  const { tables } = schema;
  const options = useMemo(() => tablesToOptions(tables), [tables]);
  return createElement(Select, { ...props, options });
}

function airtableTableSelect(overrides) {
  const defaultSelect = {
    type: "text",
    validate: validateTableSelect,
    required: true,
    admin: {
      components: {
        Field: AirtableTableSelect,
      },
      description: () => "Select Airtable Base above to see available tables",
    },
  };

  return deepmerge(defaultSelect, overrides);
}

export default airtableTableSelect;
