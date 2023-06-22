import { deepmerge } from "@mui/utils";
import {
  Select,
  getSiblingData,
  useAllFormFields,
} from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement, useMemo } from "react";

import { schema as globalSchema } from "./airtableBaseSelect";

function fieldsToOptions(fields) {
  return (
    fields?.map((item) => ({
      value: item.name,
      label: item.name,
      id: item.id,
    })) || []
  );
}

export function validateColumnSelect(tableField) {
  return async function validate(value, { hasMany, required, t, data }) {
    const tableId = data.schema[tableField];
    const { tables } = globalSchema;
    const table = tables?.find(({ id }) => id === tableId);
    const options = fieldsToOptions(table?.fields);
    return select(value, { hasMany, options, required, t });
  };
}

const ColumnSelect = (tableField) => {
  return function CSelect(props) {
    const [fields] = useAllFormFields();
    const document = getSiblingData(fields, "schema");
    const { schema } = document;
    const tableId = schema[tableField];
    const { tables } = globalSchema;
    const table = tables?.find(({ id }) => id === tableId);
    const options = useMemo(
      () => fieldsToOptions(table?.fields),
      [table?.fields]
    );

    return createElement(Select, { ...props, options });
  };
};

function airtableColumnSelect({ tableField, overrides = {} }) {
  const defaultSelect = {
    type: "text",
    validate: validateColumnSelect(tableField),
    required: true,
    admin: {
      components: {
        Field: ColumnSelect(tableField),
      },
      description: () =>
        "Select Airtable Base and Table name above to see available columns",
    },
  };

  return deepmerge(defaultSelect, overrides);
}

export default airtableColumnSelect;
