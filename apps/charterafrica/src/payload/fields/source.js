import { deepmerge } from "@mui/utils";

function source(overrides) {
  const defaultField = {
    name: "source",
    type: "select",
    label: {
      en: "Source",
      pt: "Fonte",
      fr: "Source",
    },
    defaultValue: "github",
    options: [
      { label: "Github", value: "github" },
      { label: "Gitlab", value: "gitlab" },
      { label: "Bitbucket", value: "bitbucket" },
    ],
    required: true,
    admin: {
      readOnly: true,
    },
  };

  return deepmerge(defaultField, overrides);
}

export default source;
