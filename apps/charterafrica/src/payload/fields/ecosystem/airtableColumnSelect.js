import { deepmerge } from "@mui/utils";
import {
  Select,
  getSiblingData,
  useAllFormFields,
} from "payload/components/forms";
import { createElement } from "react";
import useSWR from "swr";

import fetchJson from "../../../utils/fetchJson";

const fetcher = (url) => fetchJson.get(url);

const columnSelect = ({ tableField, baseField }) => {
  return function ColumnSelect(props) {
    const [fields] = useAllFormFields();
    const document = getSiblingData(fields, baseField);
    const baseId = document.airtableBase;
    const tableId = document[tableField];
    const { data = {} } = useSWR(
      baseId
        ? `/api/v1/resources/ecosystem/schema?source=airtable&url=/meta/bases/${baseId}/tables`
        : null,
      fetcher
    );
    const table = data?.tables?.find(({ id }) => id === tableId);
    const options =
      table?.fields?.map((item) => ({
        value: item.name,
        label: item.name,
        id: item.id,
      })) || [];
    return createElement(Select, { ...props, options });
  };
};

const airtableColumnSelect = ({ tableField, baseField, ...overrrides }) => {
  const defaults = {
    required: true,
    type: "text",
    admin: {
      description: () =>
        "Enter Airtable Base above and Table to select a column from",
      components: {
        Field: columnSelect({ tableField, baseField }),
      },
    },
  };
  return deepmerge(defaults, overrrides);
};
export default airtableColumnSelect;
