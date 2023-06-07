import { deepmerge } from "@mui/utils";

const eTag = (overrides) => {
  const field = {
    type: "text",
    label: { en: "E Tag", fr: "Étiquette", pt: "E tag" },
    name: "eTag",
    admin: {
      readOnly: true,
      position: "sidebar",
    },
  };
  return deepmerge(field, overrides);
};

export default eTag;
