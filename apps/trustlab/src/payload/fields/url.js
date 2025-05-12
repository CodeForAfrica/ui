import { deepmerge } from "@mui/utils";
import { text } from "payload/shared";

function url({ overrides = undefined } = {}) {
  const urlResult = {
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
