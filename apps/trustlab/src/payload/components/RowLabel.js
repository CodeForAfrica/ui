"use client";

// This component defines labels for Array field rows and Collapsible field headers.
// Required in Payload v3, where custom components must be used for label customization.
// See: https://payloadcms.com/docs/fields/array#admin-options

import { useRowLabel } from "@payloadcms/ui";
import React from "react";

const getLabelData = (path, data, rowNumber = 0) => {
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

  if (path.includes("primaryNavigation.menus")) {
    const menuValue =
      data?.label || data?.reference?.title || data?.url || data?.id;
    return {
      label: "Menu",
      data: typeof menuValue === "string" ? menuValue : null,
    };
  }

  return { label: "Item", data: null };
};

export function RowLabel() {
  const { data, rowNumber, path } = useRowLabel();
  const { label, data: message } = getLabelData(path, data, rowNumber);

  return (
    <label htmlFor={path}>
      {message ?? `${label} ${String(rowNumber).padStart(2, "0")}`}
    </label>
  );
}

export default RowLabel;
