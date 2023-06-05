import { deepmerge } from "@mui/utils";

function title(overrides) {
  const field = {
    name: "title",
    label: {
      en: "Title",
      fr: "Titre",
      pt: "Título",
    },
    type: "text",
    required: true,
    localized: true,
  };

  return deepmerge(field, overrides);
}

export default title;
