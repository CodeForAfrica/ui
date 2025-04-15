import { deepmerge } from "@mui/utils";
import type { Field } from "payload";

interface Args {
  overrides?: Partial<Field>;
}
function url({ overrides = undefined }: Args = {}): Field {
  const urlResult: Field = {
    name: "url",
    type: "text",
    label: "URL",
    validate: (value: string | undefined | null) => {
      if (!value) return true; // Assuming we can allow empty values

      try {
        new URL(value);
      } catch (e) {
        if (e instanceof TypeError) {
          return "Please enter valid URL";
        }
      }
      return true;
    },
  };

  return deepmerge(urlResult, overrides);
}

export default url;
