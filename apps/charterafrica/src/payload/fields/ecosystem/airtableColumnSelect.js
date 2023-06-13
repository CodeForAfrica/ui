import { deepmerge } from "@mui/utils";
import {
  Select,
  getSiblingData,
  useAllFormFields,
} from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement, useMemo } from "react";
import useSWR from "swr";

import fetchJson from "../../../utils/fetchJson";

function getUrl(baseId) {
  if (baseId) {
    return `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/resources/ecosystem/schema?source=airtable&url=/meta/bases/${baseId}/tables`;
  }
  return null;
}

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
    const url = getUrl(data?.baseId);
    if (url) {
      const tableId = data.schema[tableField];
      const { tables } = await fetchJson.get(url);
      const table = tables?.find(({ id }) => id === tableId);
      const options = fieldsToOptions(table?.fields);
      return select(value, { hasMany, options, required, t });
    }
    return [];
  };
}

const ColumnSelect = (tableField) => {
  return function CSelect(props) {
    const [fields] = useAllFormFields();
    const document = getSiblingData(fields, "schema");
    const { baseId, schema } = document;
    const tableId = schema[tableField];
    const { data = {} } = useSWR(getUrl(baseId), fetchJson.get);
    const table = data?.tables?.find(({ id }) => id === tableId);
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
