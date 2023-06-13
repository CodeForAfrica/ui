import {
  Select,
  getSiblingData,
  useAllFormFields,
} from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement, useMemo } from "react";
import useSWR from "swr";

import fetchJson from "../../../utils/fetchJson";

const getOptions = async (baseId) => {
  if (baseId) {
    const url = `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/resources/ecosystem/schema?source=airtable&url=/meta/bases/${baseId}/tables`;
    const { tables } = await fetchJson.get(url);
    const options = tables?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    return options;
  }
  return [];
};

export const validateTableSelect = async (
  value,
  { hasMany, required, t, data: { baseId } }
) => {
  const options = await getOptions(baseId);
  return select(value, { hasMany, options, required, t });
};

function AirtableTableSelect(props) {
  const [fields] = useAllFormFields();
  const { baseId } = getSiblingData(fields, "baseId");
  const { data = { tables: [] } } = useSWR(
    baseId
      ? `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/resources/ecosystem/schema?source=airtable&url=/meta/bases/${baseId}/tables`
      : null,
    fetchJson.get
  );
  const options = useMemo(
    () =>
      data.tables.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    [data.tables]
  );
  return createElement(Select, { ...props, options });
}

export default AirtableTableSelect;
