import { deepmerge } from "@mui/utils";
import { Select } from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement } from "react";
import useSWR from "swr";

import fetchJson from "../../../utils/fetchJson";

const baseUrl = `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/resources/ecosystem`;

export function getTablesUrl(baseId) {
  if (baseId) {
    return `${baseUrl}/schema?baseId=${baseId}`;
  }
  return null;
}

export const schema = {};

function basesToOptions(bases) {
  return bases?.map((item) => ({ value: item.id, label: item.name })) || [];
}

const getBaseOptions = async () => {
  const { bases } = await fetchJson.get(`${baseUrl}/bases`);
  return basesToOptions(bases);
};

const validateBaseSelect = async (value, { hasMany, required, t }) => {
  const options = await getBaseOptions();
  const valid = select(value, { hasMany, options, required, t });
  if (valid) {
    const link = getTablesUrl(value);
    const { tables } = await fetchJson.get(link);
    schema.tables = tables;
  }
  return valid;
};

function AirtableBaseSelect(props) {
  const { data: { bases } = {} } = useSWR(`${baseUrl}/bases`, fetchJson.get);
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
