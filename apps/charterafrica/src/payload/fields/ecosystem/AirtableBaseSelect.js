import { Select } from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement } from "react";
import useSWR from "swr";

import fetchJson from "../../../utils/fetchJson";

const url = `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/resources/ecosystem/schema?source=airtable&url=/meta/bases`;

const getOptions = async () => {
  const { bases = [] } = await fetchJson.get(url);
  const options = bases?.map((item) => ({ value: item.id, label: item.name }));
  return options;
};

export const validateBaseSelect = async (value, { hasMany, required, t }) => {
  const options = await getOptions();
  return select(value, { hasMany, options, required, t });
};

function AirtableBaseSelect(props) {
  const { data = {} } = useSWR(url, fetchJson.get);
  const options =
    data?.bases?.map((item) => ({ value: item.id, label: item.name })) || [];
  return createElement(Select, { ...props, options });
}

export default AirtableBaseSelect;
