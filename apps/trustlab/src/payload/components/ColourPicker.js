"use client";

import {
  FieldDescription,
  FieldError,
  FieldLabel,
  useField,
} from "@payloadcms/ui";
import React from "react";

// Native Payload v3 client component used as the `Field` for colour fields
// produced by colourTextField. Replaces the legacy
// @nouance/payload-better-fields-plugin ColourText component, which is built for
// an older @payloadcms/ui and crashes under the version this app runs. It binds
// to the field value via useField (no extra state) and renders a native colour
// swatch alongside a hex text input that stay in sync.
export function ColourPicker(props) {
  const { field, path } = props;
  const { label, required, admin: { description } = {} } = field ?? {};
  const { value, setValue, showError, errorMessage } = useField({ path });

  // Both inputs fall back to the same colour so the swatch and the hex text
  // never disagree when no value is stored (e.g. a new or cleared field).
  const colour = value || "#ffffff";

  return (
    <div className={`field-type text${showError ? " error" : ""}`}>
      <FieldLabel label={label} path={path} required={required} />
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          type="color"
          aria-label={`${typeof label === "string" ? label : "Colour"} swatch`}
          value={colour}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: "40px",
            height: "40px",
            flexShrink: 0,
            padding: 0,
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        />
        <input
          type="text"
          value={colour}
          placeholder="#ffffff"
          onChange={(e) => setValue(e.target.value)}
          style={{ flex: 1 }}
        />
      </div>
      <FieldError path={path} showError={showError} message={errorMessage} />
      {description ? (
        <FieldDescription path={path} description={description} />
      ) : null}
    </div>
  );
}

export default ColourPicker;
