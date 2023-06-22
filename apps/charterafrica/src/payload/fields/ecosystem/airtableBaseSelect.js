import { deepmerge } from "@mui/utils";
import { Select } from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement } from "react";
import useSWR from "swr";

import fetchJson from "../../../utils/fetchJson";

const url = `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/resources/ecosystem/schema?source=airtable&url=/meta/bases`;

export function getUrl(baseId) {
  if (baseId) {
    return `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/resources/ecosystem/schema?source=airtable&url=/meta/bases/${baseId}/tables`;
  }
  return null;
}

export const schema = {};

function basesToOptions(bases) {
  return bases?.map((item) => ({ value: item.id, label: item.name })) || [];
}

const getOptions = async () => {
  const { bases } = await fetchJson.get(url);
  return basesToOptions(bases);
};

const validateBaseSelect = async (value, { hasMany, required, t }) => {
  if (value) {
    const link = getUrl(value);
    const { tables } = await fetchJson.get(link);
    schema.tables = tables;
  }
  const options = await getOptions();
  return select(value, { hasMany, options, required, t });
};

function AirtableBaseSelect(props) {
  const { data: { bases } = {} } = useSWR(url, fetchJson.get);
  const options = basesToOptions(bases);

  return createElement(Select, { ...props, options });
}

function airtableBaseSelect(overrides) {
  const defaultSelect = {
    name: "baseId",
    label: {
      en: "Airtable Base",
      fr: "Base aérinable",
      pt: "Base aérea",
    },
    type: "text",
    validate: validateBaseSelect,
    required: true,
    admin: {
      components: {
        Field: AirtableBaseSelect,
      },
    },
  };

  return deepmerge(defaultSelect, overrides);
}

export default airtableBaseSelect;
