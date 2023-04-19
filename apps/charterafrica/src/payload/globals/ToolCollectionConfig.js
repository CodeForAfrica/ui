import { GLOBAL_TOOL_COLLECTION_CONFIG } from "../../lib/tools/models";
import {
  ColumnSelect,
  validateSelect,
  SheetSelect,
} from "../fields/spreadSheetSelect";
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
          Field: SheetSelect,
        },
      },
    },
    {
      name: "columnMappings",
      type: "group",
      fields: [
        {
          label: {
            en: "Tool Link",
            fr: "Nom d'outil",
            pt: "Nome da ferramenta",
          },
          required: true,
          name: "toolLink",
          type: "text",
          admin: {
            description: () =>
              "Select a column that matches Tool Link. Use organisation/owner format",
            components: {
              Field: ColumnSelect,
            },
          },
        },
        {
          label: {
            en: "Tool Name",
            fr: "Nom d'outil",
            pt: "Nome da ferramenta",
          },
          required: true,
          name: "toolName",
          type: "text",
          admin: {
            description: () => "Select a column that matches Tool Name",
            components: {
              Field: ColumnSelect,
            },
          },
        },
        {
          label: {
            en: "Tool Description",
            fr: "Description de l'outil",
            pt: "Descrição da ferramenta",
          },
          required: true,
          name: "toolDescription",
          type: "text",
          admin: {
            description: () => "Select a column that matches Tool Description",
            components: {
              Field: ColumnSelect,
            },
          },
        },
        {
          label: { en: "Location", fr: "Emplacement", pt: "Localização" },
          required: true,
          name: "toolLocation",
          type: "text",
          admin: {
            description: () => "Select a column that matches Tool Location",
            components: {
              Field: ColumnSelect,
            },
          },
        },
        {
          label: { en: "Topic", fr: "Sujet", pt: "Tema" },
          required: true,
          name: "toolTopic",
          type: "text",
          admin: {
            description: () => "Select a column that matches Topics",
            components: {
              Field: ColumnSelect,
            },
          },
        },
      ],
    },
  ],
};

export default ToolConfig;
