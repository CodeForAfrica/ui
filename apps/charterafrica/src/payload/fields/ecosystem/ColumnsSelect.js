import {
  Select,
  getSiblingData,
  useAllFormFields,
} from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement, useMemo } from "react";
import useSWR from "swr";

import fetchJson from "../../../utils/fetchJson";

export function validate(tableField) {
  return async function validateColumn(value, { hasMany, required, t, data }) {
    const tableId = data[tableField];
    const { tables } = fetchJson.get(
      `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/resources/ecosystem/schema?source=airtable&url=/meta/bases/${data.baseId}/tables`
    );
    const table = tables?.find(({ id }) => id === tableId);
    const options = table?.fields?.map((item) => ({
      value: item.name,
      label: item.name,
      id: item.id,
    }));
    return select(value, { hasMany, options, required, t });
  };
}

const ColumnSelect = ({ tableField }) => {
  return function CSelect(props) {
    const [fields] = useAllFormFields();
    const document = getSiblingData(fields, "schema");
    const { baseId, schema } = document;
    const tableId = schema[tableField];
    const { data = {} } = useSWR(
      baseId
        ? `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/resources/ecosystem/schema?source=airtable&url=/meta/bases/${baseId}/tables`
        : null,
      fetchJson.get
    );
    const table = data?.tables?.find(({ id }) => id === tableId);
    const options = useMemo(
      () =>
        table?.fields?.map((item) => ({
          value: item.name,
          label: item.name,
          id: item.id,
        })) || [],
      [table?.fields]
    );
    return createElement(Select, { ...props, options });
  };
};

export default ColumnSelect;
