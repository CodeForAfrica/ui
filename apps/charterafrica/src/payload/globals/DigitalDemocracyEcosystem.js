import { DIGITAL_DEMOCRACY_ECOSYSTEM } from "../../lib/tools/models";
import { ColumnSelect } from "../fields/democracyToolsSelect";

const DigitalDemocracyEcosystem = {
  slug: DIGITAL_DEMOCRACY_ECOSYSTEM,
  label: {
    en: "Digital Democracy Ecosystem",
    fr: "Écosystème de la démocratie numérique",
    pt: "Ecossistema de democracia digital",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "columnMappings",
      type: "group",
      fields: [
        {
          label: {
            en: "Tool Github",
            fr: "Outil github",
            pt: "Ferramenta github",
          },
          required: true,
          name: "toolGithub",
          type: "text",
          admin: {
            description: () =>
              "Select a column that matches Tool Github. Use organisation/owner format",
            components: {
              Field: ColumnSelect,
            },
          },
        },
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

export default DigitalDemocracyEcosystem;
