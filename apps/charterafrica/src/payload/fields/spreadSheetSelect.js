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
  const spreadSheetId = getSpreadsheetIdFromUrl(siblingData.url || "");
  const { sheetName } = siblingData;
  const params = {
    spreadSheetId,
    sheetName,
  };
  const queryString = new URLSearchParams(params).toString();
  return { queryString };
};

export const validateSelect = async (
  value,
  { data: siblingData, hasMany, required, t }
) => {
  try {
    const { queryString } = getParamsFromDoc(siblingData);
    const data = await fetchJson.get(
      `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/github/sheetsPerSpreadsheet?${queryString}`
    );
    const options =
      data?.map((item) => ({
        value: item,
        label: item,
      })) || [];
    return select(value, { hasMany, options, required, t });
  } catch (error) {
    return select(value, { hasMany, options: [], required, t });
  }
};

export function SheetSelect(props) {
  const [fields] = useAllFormFields();
  const siblingData = getSiblingData(fields, "url");
  const { queryString } = getParamsFromDoc(siblingData);
  const { data } = useSWR(
    siblingData.url
      ? `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/github/sheetsPerSpreadsheet?${queryString}`
      : null,
    fetcher
  );
  const memoOptions = () =>
    data?.map((item) => ({
      value: item,
      label: item,
    })) || [];
  const options = useMemo(memoOptions, [data]);
  return createElement(Select, { ...props, options });
}

export function ColumnSelect(props) {
  const [fields] = useAllFormFields();
  const siblingData = getSiblingData(fields, "url");
  const { queryString } = getParamsFromDoc(siblingData);
  const { data } = useSWR(
    siblingData.url && siblingData.sheetName
      ? `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/github/sheetData?${queryString}`
      : null,
    fetcher
  );
  const firstObject = data?.[0];
  const options = useMemo(
    () =>
      Object.keys(firstObject || {})
        .filter((key) => !!key)
        .map((item) => ({
          value: item,
          label: item,
        })) || [],
    [firstObject]
  );
  return createElement(Select, { ...props, options });
}
