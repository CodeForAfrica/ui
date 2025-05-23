"use client";

import { useRowLabel, RowLabel } from "@payloadcms/ui";
import React from "react";

export function CustomRowLabel({ label }) {
  const { data, rowNumber, path } = useRowLabel();
  return (
    <RowLabel path={path} label={data?.[label] || `Row ${rowNumber + 1}`} />
  );
}

export default CustomRowLabel;
