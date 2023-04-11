import { deepmerge } from "@mui/utils";

import richText from "./richText";

function accordion({ richTextConfig, overrides = {} } = {}) {
  const generatedAccordion = {
    name: "items",
    type: "array",
    minRows: 1,
    fields: [
      {
        name: "summary",
        label: {
          en: "Summary",
          fr: "Objet",
          pt: "Item",
        },
        type: "group",
        required: true,
        fields: [
          {
            name: "title",
            type: "text",
            label: {
              en: "Title",
              fr: "Titre",
              pt: "Título",
            },
            required: true,
            localized: true,
          },
          {
            name: "excerpt",
            type: "text",
            label: {
              en: "Excerpt",
              fr: "Extrait",
              pt: "Excerto",
            },
            localized: true,
          },
        ],
      },
      richText(
        deepmerge(
          {
            name: "details",
            label: {
              en: "Details",
              fr: "La description",
              pt: "Descrição",
            },
            required: true,
            localized: true,
            admin: {
              elements: [
                "h6",
                "link",
                "ol",
                "ul",
                "indent",
              ],
              leaves: ["bold", "italic", "underline", "code"],
            },
          },
          richTextConfig,
          { clone: false }
        )
      ),
    ],
    admin: {
      initCollapsed: true,
      components: {
        RowLabel: ({ data }) => {
          return data?.summary?.title || data?.id;
        },
      },
    },
  };

  return deepmerge(generatedAccordion, overrides, { clone: false });
}

export default accordion;
