"use client";
import React from "react";
import { useRowLabel } from "@payloadcms/ui";

interface RowData extends Record<string, any> {
  title?: string;
}

interface Data {
  title?: string;
  message?: string;
  name?: string;
  platform?: string;
  url?: string;
  [key: string]: unknown;
}

const getLabelData = (
  path: string,
  data: Data,
  rowNumber?: number,
): { label: string; data?: string | null } => {
  console.log(path);
  console.log(JSON.stringify(data));
  if (path.includes("Headers")) return { label: "Header", data: data?.title };

  if (path.includes("message"))
    return { label: "Message", data: data?.message };

  if (path.includes("partners"))
    return {
      label: "Partner",
      data:
        data?.name ||
        (rowNumber !== undefined ? `Partner ${rowNumber + 1}` : null),
    };

  if (path.includes("connect.links")) {
    return {
      label: "Link",
      data:
        (data.platform && data.url && `${data.platform} (${data.url})`) ||
        data.platform ||
        data.url ||
        (rowNumber !== undefined
          ? `Link ${String(rowNumber).padStart(2, "0")}`
          : null),
    };
  }

  return { label: "Item", data: null };
};

export const RowLabel = () => {
  const { data, rowNumber, path } = useRowLabel<RowData>();
  const { label, data: message } = getLabelData(path, data, rowNumber);

  return (
    <label>{message ?? `${label} ${String(rowNumber).padStart(2, "0")}`}</label>
  );
};

export default RowLabel;
