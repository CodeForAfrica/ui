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
  const params = {
    spreadSheetId,
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
    `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/github/sheets-per-doc?${queryString}`
  );
  const options =
    data?.map((item) => ({
      value: item,
      label: item,
    })) || [];
  return select(value, { hasMany, options, required, t });
};

function SheetSelect(props) {
  const [fields] = useAllFormFields();
  const siblingData = getSiblingData(fields, "url");
  const { queryString } = getParamsFromDoc(siblingData);
  const { data } = useSWR(
    siblingData.url
      ? `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/github/sheets-per-doc?${queryString}`
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

export default SheetSelect;
