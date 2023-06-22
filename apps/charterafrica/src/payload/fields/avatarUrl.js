import { deepmerge } from "@mui/utils";

function avatarUrl(overrides) {
  const defaults = {
    name: "avatarUrl",
    type: "text",
    admin: {
      readOnly: true,
    },
    label: { en: "Avatar URL", fr: "URL d'avatar", pt: "URL de avatar" },
  };

  return deepmerge(defaults, overrides);
}

export default avatarUrl;
