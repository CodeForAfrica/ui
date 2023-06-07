import { Select } from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement } from "react";
import useSWR from "swr";

import fetchJson from "../../../utils/fetchJson";

const fetcher = (url) =>
  fetchJson.get(url, { params: { source: "airtable", url: "/meta/bases" } });
const url = `/api/v1/resources/ecosystem/proxy`;
const getOptions = async () => {
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

function AirtableBaseSelect(props) {
  const { data = {} } = useSWR(url, fetcher);
  const options =
    data?.bases?.map((item) => ({ value: item.id, label: item.name })) || [];
  return createElement(Select, { ...props, options });
}

export default AirtableBaseSelect;
