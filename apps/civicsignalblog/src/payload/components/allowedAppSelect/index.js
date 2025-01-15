import { SelectInput, useField } from "payload/components/forms";
import { useAuth } from "payload/components/utilities";
import { useState, useEffect, createElement } from "react";

import applications from "#civicsignalblog/payload/lib/data/common/applications";

function CustomSelectComponent({ path, label }) {
  const { user } = useAuth();
  const { value, setValue } = useField({ path });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const allowedApps = user?.allowedApps || []; // We could cast this using as string[]; but this can't be parsed without adding a ts parser
    if (Array.isArray(allowedApps)) {
      const filteredApps = applications
        .filter((app) => allowedApps.includes(app.value))
        .map((app) => ({
          label: app.label,
          value: app.value,
        }));
      setOptions(filteredApps);
    }
  }, [user?.allowedApps]);

  return createElement(
    "div",
    null,
    createElement("label", { className: "field-label", htmlFor: path }, label),
    createElement(SelectInput, {
      style: { marginBottom: "var(--spacing-field)" },
      path,
      name: path,
      options,
      value: String(value ?? ""),
      onChange: (e) => setValue(e.value),
    }),
  );
}

export default CustomSelectComponent;
