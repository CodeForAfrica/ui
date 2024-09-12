import { deepmerge } from "@mui/utils";
import { text } from "node_modules/payload/dist/fields/validations";
import { Field } from "payload";

interface Args {
  overrides?: Partial<Field>;
}
function url({ overrides = undefined }: Args = {}): Field {
  const urlResult: Field = {
    name: "url",
    type: "text",
    label: "URL",
    validate: (val, options) => {
      try {
        // eslint-disable-next-line no-new
        new URL(val);
      } catch (e) {
        if (e instanceof TypeError) {
          return "Please enter valid URL";
        }
      }
      return text(val, options);
    },
  };

  return deepmerge(urlResult, overrides);
}

export default url;
