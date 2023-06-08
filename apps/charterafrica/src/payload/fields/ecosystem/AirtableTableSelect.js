import {
  Select,
  getSiblingData,
  useAllFormFields,
} from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement } from "react";
import useSWR from "swr";

import fetchJson from "../../../utils/fetchJson";

const getOptions = async (baseId) => {
  const url = `/api/v1/resources/ecosystem/schema?source=airtable&url=/meta/bases/${baseId}/tables`;
  const { tables } = await fetchJson.get(url);
  const options = tables?.map((item) => ({ value: item.id, label: item.name }));
  return options;
};

export const validateSelect = async (
  value,
  { hasMany, required, t, siblingData: { airtableBase } }
) => {
  const options = await getOptions(airtableBase);
  return select(value, { hasMany, options, required, t });
};

function AirtableTableSelect(props) {
  const [fields] = useAllFormFields();
  const document = getSiblingData(fields, "airtableBase");
  const baseId = document.airtableBase;
  const { data = {} } = useSWR(
    baseId
      ? `/api/v1/resources/ecosystem/schema?source=airtable&url=/meta/bases/${baseId}/tables`
      : null,
    fetchJson.get
  );
  const options =
    data?.tables?.map((item) => ({ value: item.id, label: item.name })) || [];
  return createElement(Select, { ...props, options });
}

export default AirtableTableSelect;
