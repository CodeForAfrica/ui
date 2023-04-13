import spreadSheetSelect, { validateSelect } from "../fields/spreadSheetSelect";
import { mapUrlToId } from "../utils/githubUtils";

const GithubTool = {
  slug: "github-tool",
  label: {
    en: "Github Tool Collection",
    fr: "Collection d'outils GitHub",
    pt: "Coleção de ferramentas do GitHub",
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

export default GithubTool;
