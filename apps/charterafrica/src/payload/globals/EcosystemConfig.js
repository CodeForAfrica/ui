import { ECOSYSTEM_CONFIG } from "../../lib/ecosystem/models";
import AirtableBaseSelect from "../fields/ecosystem/AirtableBaseSelect";
import airtableColumnSelect from "../fields/ecosystem/airtableColumnSelect";
import AirtableTableSelect from "../fields/ecosystem/AirtableTableSelect";

const EcosystemConfig = {
  slug: ECOSYSTEM_CONFIG,
  label: {
    en: "Ecosystem Config",
    fr: "Configuration de l'écosystème",
    pt: "Config do ecossistema",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "collapsible",
      label: {
        en: "Base Select",
        fr: "Sélection de base",
        pt: "Base Selecione",
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "airtableBase",
          label: {
            en: "Airtable Base",
            fr: "Base aérinable",
            pt: "Base aérea",
          },
          required: true,
          type: "text",
          admin: {
            components: {
              Field: AirtableBaseSelect,
            },
          },
        },
        {
          name: "enableTranslation",
          type: "checkbox",
          label: {
            en: "Enable Translations",
            fr: "Activer les traductions",
            pt: "Ativar traduções",
          },
          defaultValue: false,
        },
      ],
    },
    {
      type: "collapsible",
      label: {
        en: "Tools Table",
        fr: "Table d'outils",
        pt: "Tabela de ferramentas",
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "toolsTableName",
          label: {
            en: "Tools Table Name",
            fr: "Nom du tableau des outils",
            pt: "Nome da tabela de ferramentas",
          },
          required: true,
          type: "text",
          admin: {
            description: () => "Enter Airtable Base above to select a table",
            components: {
              Field: AirtableTableSelect,
            },
          },
        },
        airtableColumnSelect({
          tableField: "toolsTableName",
          baseField: "airtableBase",
          name: "toolName",
          label: {
            en: "Tool Name Column",
            fr: "Colonne du nom de l'outil",
            pt: "Coluna do nome da ferramenta",
          },
        }),
        airtableColumnSelect({
          tableField: "toolsTableName",
          baseField: "airtableBase",
          name: "toolHomeCountry",
          label: {
            en: "Home Country Column",
            fr: "Colonne de campagne d'origine",
            pt: "Coluna do país natal",
          },
        }),
        {
          name: "toolTheme",
          type: "group",
          label: { en: "Theme", fr: "Thème", pt: "Tema" },
          fields: [
            airtableColumnSelect({
              tableField: "toolsTableName",
              baseField: "airtableBase",
              name: "english",
              label: {
                en: "Theme(English)",
                fr: "Thème (anglais)",
                pt: "Tema (inglês)",
              },
            }),
            airtableColumnSelect({
              tableField: "toolsTableName",
              baseField: "airtableBase",
              name: "french",
              label: {
                en: "Theme(French)",
                fr: "Thème (français)",
                pt: "Tema (francês)",
              },
              admin: {
                condition: (siblingData) => siblingData?.enableTranslation,
              },
            }),
            airtableColumnSelect({
              tableField: "toolsTableName",
              baseField: "airtableBase",
              name: "portuguese",
              label: {
                en: "Theme(Portuguese)",
                fr: "Thème (portugais)",
                pt: "Tema (português)",
              },
              admin: {
                condition: (siblingData) => siblingData?.enableTranslation,
              },
            }),
          ],
        },
        {
          name: "toolsDescription",
          type: "group",
          label: { en: "Description", fr: "Description", pt: "Descrição" },
          fields: [
            airtableColumnSelect({
              tableField: "toolsTableName",
              baseField: "airtableBase",
              name: "english",
              label: {
                en: "Description(English)",
                fr: "Description (anglais)",
                pt: "Descrição (inglês)",
              },
            }),
            airtableColumnSelect({
              tableField: "toolsTableName",
              baseField: "airtableBase",
              name: "french",
              label: {
                en: "Description(French)",
                fr: "Description (français)",
                pt: "Descrição (francês)",
              },
              admin: {
                condition: (siblingData) => siblingData?.enableTranslation,
              },
            }),
            airtableColumnSelect({
              tableField: "toolsTableName",
              baseField: "airtableBase",
              name: "portuguese",
              label: {
                en: "Description(Portuguese)",
                fr: "Description (portugais)",
                pt: "Descrição (português)",
              },
              admin: {
                condition: (siblingData) => siblingData?.enableTranslation,
              },
            }),
          ],
        },
        airtableColumnSelect({
          tableField: "toolsTableName",
          baseField: "airtableBase",
          name: "toolExternalId",
          label: {
            en: "Tool External Id Column",
            fr: "Outil colonne d'identification externe",
            pt: "Coluna de identificação externa da ferramenta",
          },
        }),
        airtableColumnSelect({
          tableField: "toolsTableName",
          baseField: "airtableBase",
          name: "toolRepoLink",
          label: {
            en: "Tool Repo Link Column",
            fr: "Colonne de liaison de réapprovisionnement en outils",
            pt: "Coluna de link de repo da ferramenta",
          },
        }),
        airtableColumnSelect({
          tableField: "toolsTableName",
          baseField: "airtableBase",
          name: "toolLink",
          label: {
            en: "Tool Link Column",
            fr: "Colonne de liaison d'outil",
            pt: "Coluna de link da ferramenta",
          },
        }),
        airtableColumnSelect({
          tableField: "toolsTableName",
          baseField: "airtableBase",
          name: "toolContributors",
          label: {
            en: "Tool Contributors Column",
            fr: "Colonne des contributeurs d'outils",
            pt: "Coluna dos colaboradores da ferramenta",
          },
        }),
        airtableColumnSelect({
          tableField: "toolsTableName",
          baseField: "airtableBase",
          name: "toolOrganisation",
          label: {
            en: "Organisation Column",
            fr: "Colonne d'organisation",
            pt: "Coluna da organização",
          },
        }),
        airtableColumnSelect({
          tableField: "toolsTableName",
          baseField: "airtableBase",
          name: "toolPartners",
          label: {
            en: "Tool Partners Column",
            fr: "Colonne des partenaires d'outils",
            pt: "Coluna de parceiros de ferramentas",
          },
        }),
        airtableColumnSelect({
          tableField: "toolsTableName",
          baseField: "airtableBase",
          name: "toolDonors",
          label: {
            en: "Tool Donors Column",
            fr: "Colonne des donateurs d'outils",
            pt: "Coluna doadores de ferramentas",
          },
        }),
      ],
    },
    {
      type: "collapsible",
      label: { en: "OrganisationTable", fr: "Organisation", pt: "Organização" },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "organisationTableName",
          label: {
            en: "OrganisationTable Name",
            fr: "Nom d'organisation",
            pt: "Nome de organização",
          },
          required: true,
          type: "text",
          admin: {
            description: () => "Enter Airtable Base above to select a table",
            components: {
              Field: AirtableTableSelect,
            },
          },
        },
        airtableColumnSelect({
          tableField: "organisationTableName",
          baseField: "airtableBase",
          name: "organisationName",
          label: {
            en: "Organisation Name Column",
            fr: "Colonne du nom de l'organisation",
            pt: "Nome da organização Coluna",
          },
        }),
        {
          name: "organisationDescription",
          type: "group",
          label: { en: "Description", fr: "Description", pt: "Descrição" },
          fields: [
            airtableColumnSelect({
              tableField: "organisationTableName",
              baseField: "airtableBase",
              name: "english",
              label: {
                en: "Description(English)",
                fr: "Description (anglais)",
                pt: "Descrição (inglês)",
              },
            }),
            airtableColumnSelect({
              tableField: "organisationTableName",
              baseField: "airtableBase",
              name: "french",
              label: {
                en: "Description(French)",
                fr: "Description (français)",
                pt: "Descrição (francês)",
              },
              admin: {
                condition: (siblingData) => siblingData?.enableTranslation,
              },
            }),
            airtableColumnSelect({
              tableField: "organisationTableName",
              baseField: "airtableBase",
              name: "portuguese",
              label: {
                en: "Description(Portuguese)",
                fr: "Description (portugais)",
                pt: "Descrição (português)",
              },
              admin: {
                condition: (siblingData) => siblingData?.enableTranslation,
              },
            }),
          ],
        },
        airtableColumnSelect({
          tableField: "organisationTableName",
          baseField: "airtableBase",
          name: "organisationUserName",
          label: {
            en: "Organisation Username Column",
            fr: "Colonne de nom d'utilisateur d'organisation",
            pt: "Coluna de nome de usuário da organização",
          },
        }),
        airtableColumnSelect({
          tableField: "organisationTableName",
          baseField: "airtableBase",
          name: "organisationUserName",
          label: {
            en: "Organisation Username Column",
            fr: "Colonne de nom d'utilisateur d'organisation",
            pt: "Coluna de nome de usuário da organização",
          },
        }),
        airtableColumnSelect({
          tableField: "organisationTableName",
          baseField: "airtableBase",
          name: "organisationType",
          label: {
            en: "Organisation Type Column",
            fr: "Colonne de type organisation",
            pt: "Coluna do tipo de organização",
          },
        }),
        airtableColumnSelect({
          tableField: "organisationTableName",
          baseField: "airtableBase",
          name: "organisationRepoLink",
          label: {
            en: "Organisation Repository Column",
            fr: "Colonne de référentiel d'organisation",
            pt: "Coluna do repositório da organização",
          },
        }),
      ],
    },
    {
      type: "collapsible",
      label: {
        en: "Contributors Table",
        fr: "Table des contributeurs",
        pt: "Tabela de colaboradores",
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "contributorTableName",
          label: {
            en: "Contributors Table Name",
            fr: "Nom du tableau des contributeurs",
            pt: "Nome da tabela dos colaboradores",
          },
          required: true,
          type: "text",
          admin: {
            description: () => "Enter Airtable Base above to select a table",
            components: {
              Field: AirtableTableSelect,
            },
          },
        },
        airtableColumnSelect({
          tableField: "contributorTableName",
          baseField: "airtableBase",
          name: "contributorUserName",
          label: {
            en: "Contributor Username Column",
            fr: "Colonne de nom d'utilisateur contributeur",
            pt: "Coluna de nome de usuário colaborador",
          },
        }),
        {
          name: "contributorDescription",
          type: "group",
          label: { en: "Description", fr: "Description", pt: "Descrição" },
          fields: [
            airtableColumnSelect({
              tableField: "contributorTableName",
              baseField: "airtableBase",
              name: "english",
              label: {
                en: "Description(English)",
                fr: "Description (anglais)",
                pt: "Descrição (inglês)",
              },
            }),
            airtableColumnSelect({
              tableField: "contributorTableName",
              baseField: "airtableBase",
              name: "french",
              label: {
                en: "Description(French)",
                fr: "Description (français)",
                pt: "Descrição (francês)",
              },
              admin: {
                condition: (siblingData) => siblingData?.enableTranslation,
              },
            }),
            airtableColumnSelect({
              tableField: "contributorTableName",
              baseField: "airtableBase",
              name: "portuguese",
              label: {
                en: "Description(Portuguese)",
                fr: "Description (portugais)",
                pt: "Descrição (português)",
              },
              admin: {
                condition: (siblingData) => siblingData?.enableTranslation,
              },
            }),
          ],
        },
        airtableColumnSelect({
          tableField: "contributorTableName",
          baseField: "airtableBase",
          name: "contributorName",
          label: {
            en: "Contributor Name Column",
            fr: "Colonne de nom de contributeur",
            pt: "Coluna de nome do colaborador",
          },
        }),
      ],
    },
  ],
};

export default EcosystemConfig;
