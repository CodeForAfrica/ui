import { SelectInput, useField } from "payload/components/forms";
import { useAuth } from "payload/components/utilities";
import React, { useState, useEffect } from "react";

import applications from "#civicsignalblog/payload/lib/data/common/applications";

function CustomSelectComponent({ path, label }) {
  const { user } = useAuth();
  const { value, setValue } = useField({ path });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const allowedApps = (user?.allowedApps || []) as string[];
    const filteredApps = applications
      .filter((app) => allowedApps.includes(app.value))
      .map((app) => ({
        label: app.label,
        value: app.value,
      }));

    setOptions(filteredApps);
  }, [user?.allowedApps]);

  return (
    <div>
      <label className="field-label" htmlFor={path}>
        {label}
      </label>
      <SelectInput
        style={{ marginBottom: "var(--spacing-field)" }}
        path={path}
        name={path}
        options={options}
        value={String(value)}
        onChange={(e) => setValue(e.value)}
      />
    </div>
  );
}

export default CustomSelectComponent;
