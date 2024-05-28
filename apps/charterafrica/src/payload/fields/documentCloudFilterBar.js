import { deepmerge } from "@mui/utils";

import defaultValue from "../utils/defaultValues";
import validateUniqueArrayFieldSelect from "../utils/validateUniqueArrayFieldSelect";

import filterBar from "./filterBar";

const sortOptions = ["created_at", "score", "title", "page_count", "source"];

function documentCloudFilterBar({ overrides } = {}) {
  const generatedDocumentCloudFilterBar = filterBar({
    overrides: {
      fields: [
        {
          name: "search",
          type: "group",
          fields: [
            {
              name: "label",
              type: "text",
              label: {
                en: "Label",
                fr: "Étiquette",
                pt: "Rótulo",
              },
              defaultValue: defaultValue({
                en: "Search",
                fr: "Rechercher",
                pt: "Pesquisar",
              }),
              required: true,
              localized: true,
            },
          ],
          admin: {
            hideGutter: true,
          },
        },
        {
          name: "sort",
          type: "group",
          label: {
            en: "Sort",
            fr: "Tri",
            pt: "Classificação",
          },
          fields: [
            {
              name: "label",
              type: "text",
              label: {
                en: "Label",
                fr: "Étiquette",
                pt: "Rótulo",
              },
              defaultValue: defaultValue({
                en: "Sort",
                fr: "Trier",
                pt: "Classificar",
              }),
              required: true,
              localized: true,
            },
            {
              name: "options",
              type: "array",
              minRows: 1,
              label: {
                en: "Sort Options",
                fr: "Options de tri",
                pt: "Opções de classificação",
              },
              fields: [
                {
                  name: "value",
                  type: "select",
                  required: true,
                  options: sortOptions,
                  validate: validateUniqueArrayFieldSelect(
                    "options",
                    "value",
                    sortOptions,
                    "charterafrica.site:uniqueSortOptions",
                  ),
                },
                {
                  name: "label",
                  type: "text",
                  label: {
                    en: "Label",
                    fr: "Étiquette",
                    pt: "Rótulo",
                  },
                  required: true,
                },
              ],
            },
          ],
          admin: {
            hideGutter: true,
            style: { marginTop: 10 },
          },
        },
      ],
    },
  });

  return deepmerge(generatedDocumentCloudFilterBar, overrides);
}

export default documentCloudFilterBar;
