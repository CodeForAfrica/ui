import {
  Select,
  getSiblingData,
  useAllFormFields,
} from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement } from "react";
import useSWR from "swr";

import fetchJson from "../../../utils/fetchJson";

const fetcher = (url) => fetchJson.get(url);
const getOptions = async (baseId) => {
  const url = `/api/v1/resources/ecosystem/proxy${baseId}/tables`;
  const { bases } = await fetcher(url);
  const options = bases.map((item) => ({ value: item.id, label: item.name }));
  return options;
};

export const validateSelect = async (value, { hasMany, required, t }) => {
  const options = await getOptions();
  try {
    return select(value, { hasMany, options, required, t });
  } catch (error) {
    return select(value, { hasMany, options, required, t });
  }
};

function AirtableTableSelect(props) {
  const [fields] = useAllFormFields();
  const document = getSiblingData(fields, "airtableBase");
  const baseId = document.airtableBase;
  const { data = {} } = useSWR(
    baseId
      ? `/api/v1/resources/ecosystem/proxy?source=airtable&url=/meta/bases/${baseId}/tables`
      : null,
    fetcher
  );
  const options =
    data?.tables?.map((item) => ({ value: item.id, label: item.name })) || [];
  return createElement(Select, { ...props, options });
}

export default AirtableTableSelect;
