import {
  useAllFormFields,
  Select,
  getSiblingData,
} from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement, useMemo } from "react";
import useSWR from "swr";

import fetchJson from "../../utils/fetchJson";
import { getSpreadsheetIdFromUrl } from "../utils/githubUtils";

const fetcher = (url) => fetch(url).then((res) => res.json());

const getParamsFromDoc = (siblingData) => {
  const id = getSpreadsheetIdFromUrl(siblingData.url || "");
  const params = {
    fields: "sheets.properties.title",
    pathname: `/${id}`,
  };
  const queryString = new URLSearchParams(params).toString();
  return { queryString };
};

export const validateSelect = async (
  value,
  { data: siblingData, hasMany, required, t }
) => {
  const { queryString } = getParamsFromDoc(siblingData);
  const data = await fetchJson.get(
    `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/github/spreadsheet?${queryString}`
  );
  const { sheets } = data || {};
  const options =
    sheets?.map((item) => ({
      value: item?.properties?.title,
      label: item?.properties?.title,
    })) || [];
  return select(value, { hasMany, options, required, t });
};

function SheetSelect(props) {
  const [fields] = useAllFormFields();
  const siblingData = getSiblingData(fields, "url");
  const { queryString } = getParamsFromDoc(siblingData);
  const { data } = useSWR(
    siblingData.url
      ? `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/github/spreadsheet?${queryString}`
      : null,
    fetcher
  );
  const { sheets } = data || {};
  const memoOptions = () =>
    sheets?.map((item) => ({
      value: item?.properties?.title,
      label: item?.properties?.title,
    })) || [];
  const options = useMemo(memoOptions, [sheets]);
  return createElement(Select, { ...props, options });
}

export default SheetSelect;
