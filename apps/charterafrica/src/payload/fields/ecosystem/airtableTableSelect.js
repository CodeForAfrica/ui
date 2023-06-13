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

function tablesToOptions(tables) {
  return tables?.map((item) => ({ value: item.id, label: item.name })) || [];
}

const getOptions = async (baseId) => {
  const url = getUrl(baseId);
  if (url) {
    const { tables } = await fetchJson.get(url);
    return tablesToOptions(tables);
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
  const { data: { tables } = {} } = useSWR(getUrl(baseId), fetchJson.get);
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
