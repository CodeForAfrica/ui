import { GLOBAL_TOOL_COLLECTION_CONFIG } from "../../lib/tools/models";
import spreadSheetSelect, { validateSelect } from "../fields/spreadSheetSelect";
import { mapUrlToId } from "../utils/githubUtils";

const ToolConfig = {
  slug: GLOBAL_TOOL_COLLECTION_CONFIG,
  label: {
    en: "Tool Collection",
    fr: "Collection d'outils",
    pt: "Coleção de ferramentas",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "url",
      label: {
        en: "Link to Spreadsheet",
        fr: "Lien vers la feuille de calcul",
        pt: "Link para a planilha",
      },
      type: "text",
      required: true,
      admin: {},
    },
    {
      name: "spreadSheetId",
      label: {
        en: "Spreadsheet ID",
        fr: "ID de feuille de calcul",
        pt: "ID da planilha",
      },
      type: "text",
      required: true,
      hooks: {
        beforeValidate: [mapUrlToId],
      },
      admin: {
        hidden: true,
      },
    },
    {
      name: "sheetName",
      label: { en: "Sheet Name", fr: "Nom de feuille", pt: "Nome da folha" },
      type: "text", // Leave as text to avoid Graphql Enum validation
      required: true,
      validate: validateSelect,
      admin: {
        description: () => "Enter a valid sheet url to get the data from",
        components: {
          Field: spreadSheetSelect,
        },
      },
    },
  ],
};

export default ToolConfig;
