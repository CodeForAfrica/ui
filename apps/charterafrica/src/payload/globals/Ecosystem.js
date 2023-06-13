import { ECOSYSTEM_CONFIG } from "../../lib/ecosystem/models";
import AirtableBaseSelect, {
  validateBaseSelect,
} from "../fields/ecosystem/AirtableBaseSelect";
import airtableColumnSelect from "../fields/ecosystem/airtableColumnSelect";
import AirtableTableSelect, {
  validateTableSelect,
} from "../fields/ecosystem/AirtableTableSelect";
import sourceField from "../fields/ecosystem/sourceField";

const Ecosystem = {
  slug: ECOSYSTEM_CONFIG,
  label: { en: "Ecosystem", fr: "Écosystème", pt: "Ecossistema" },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "collapsible",
      label: { en: "Airtable Base", fr: "Base aérinable", pt: "Base aérea" },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "baseId",
          label: {
            en: "Airtable Base",
            fr: "Base aérinable",
            pt: "Base aérea",
          },
          required: true,
          type: "text",
          validate: validateBaseSelect,
          admin: {
            components: {
              Field: AirtableBaseSelect,
            },
          },
        },
        {
          name: "localized",
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
      name: "schema",
      type: "group",
      label: { en: "Schema", fr: "Schéma", pt: "Esquema" },
      admin: {
        hideGutter: true,
      },
      fields: [
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
              name: "toolTableId",
              label: {
                en: "Tools Table Name",
                fr: "Nom du tableau des outils",
                pt: "Nome da tabela de ferramentas",
              },
              required: true,
              validate: validateTableSelect,
              type: "text",
              admin: {
                description: () =>
                  "Enter Airtable Base above to select a table",
                components: {
                  Field: AirtableTableSelect,
                },
              },
            },
            {
              name: "toolTableColumns",
              type: "group",
              admin: {
                hideGutter: true,
              },
              fields: [
                airtableColumnSelect({
                  tableField: "toolTableId",
                  name: "slug",
                  label: {
                    en: "Tool External Id Column",
                    fr: "Outil colonne d'identification externe",
                    pt: "Coluna de identificação externa da ferramenta",
                  },
                }),
                airtableColumnSelect({
                  tableField: "toolTableId",
                  name: "name",
                  label: {
                    en: "Tool Name Column",
                    fr: "Colonne du nom de l'outil",
                    pt: "Coluna do nome da ferramenta",
                  },
                }),
                {
                  name: "description",
                  type: "group",
                  label: {
                    en: "Description",
                    fr: "Description",
                    pt: "Descrição",
                  },
                  admin: {
                    hideGutter: true,
                  },
                  fields: [
                    airtableColumnSelect({
                      tableField: "toolTableId",
                      name: "english",
                      label: {
                        en: "Description(English)",
                        fr: "Description (anglais)",
                        pt: "Descrição (inglês)",
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "toolTableId",
                      name: "french",
                      label: {
                        en: "Description(French)",
                        fr: "Description (français)",
                        pt: "Descrição (francês)",
                      },
                      admin: {
                        condition: (siblingData) => siblingData?.localized,
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "toolTableId",
                      name: "portuguese",
                      label: {
                        en: "Description(Portuguese)",
                        fr: "Description (portugais)",
                        pt: "Descrição (português)",
                      },
                      admin: {
                        condition: (siblingData) => siblingData?.localized,
                      },
                    }),
                  ],
                },
                {
                  name: "theme",
                  type: "group",
                  label: { en: "Theme", fr: "Thème", pt: "Tema" },
                  admin: {
                    hideGutter: true,
                  },
                  fields: [
                    airtableColumnSelect({
                      tableField: "toolTableId",
                      name: "english",
                      label: {
                        en: "Theme(English)",
                        fr: "Thème (anglais)",
                        pt: "Tema (inglês)",
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "toolTableId",
                      name: "french",
                      label: {
                        en: "Theme(French)",
                        fr: "Thème (français)",
                        pt: "Tema (francês)",
                      },
                      admin: {
                        condition: (siblingData) => siblingData?.localized,
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "toolTableId",
                      name: "portuguese",
                      label: {
                        en: "Theme(Portuguese)",
                        fr: "Thème (portugais)",
                        pt: "Tema (português)",
                      },
                      admin: {
                        condition: (siblingData) => siblingData?.localized,
                      },
                    }),
                  ],
                },
                airtableColumnSelect({
                  tableField: "toolTableId",
                  name: "homeCountry",
                  label: {
                    en: "Home Country Column",
                    fr: "Colonne de campagne d'origine",
                    pt: "Coluna do país natal",
                  },
                }),
                airtableColumnSelect({
                  tableField: "toolTableId",
                  name: "url",
                  label: {
                    en: "Tool Link Column",
                    fr: "Colonne de liaison d'outil",
                    pt: "Coluna de link da ferramenta",
                  },
                }),
                sourceField({ tableField: "toolTableId" }),
                airtableColumnSelect({
                  tableField: "toolTableId",
                  name: "contributors",
                  label: {
                    en: "Tool Contributors Column",
                    fr: "Colonne des contributeurs d'outils",
                    pt: "Coluna dos colaboradores da ferramenta",
                  },
                }),
                airtableColumnSelect({
                  tableField: "toolTableId",
                  name: "organisation",
                  label: {
                    en: "Organisation Column",
                    fr: "Colonne d'organisation",
                    pt: "Coluna da organização",
                  },
                }),
                airtableColumnSelect({
                  tableField: "toolTableId",
                  name: "partners",
                  label: {
                    en: "Tool Partners Column",
                    fr: "Colonne des partenaires d'outils",
                    pt: "Coluna de parceiros de ferramentas",
                  },
                }),
                airtableColumnSelect({
                  tableField: "toolTableId",
                  name: "supporters",
                  label: {
                    en: "Supporters",
                    fr: "Partisans",
                    pt: "Apoiadores",
                  },
                }),
              ],
            },
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
              name: "contributorTableId",
              label: {
                en: "Contributors Table Name",
                fr: "Nom du tableau des contributeurs",
                pt: "Nome da tabela dos colaboradores",
              },
              required: true,
              validate: validateTableSelect,
              type: "text",
              admin: {
                description: () =>
                  "Enter Airtable Base above to select a table",
                components: {
                  Field: AirtableTableSelect,
                },
              },
            },
            {
              name: "contributorTableColumns",
              type: "group",
              admin: {
                hideGutter: true,
              },
              fields: [
                airtableColumnSelect({
                  tableField: "contributorTableId",
                  name: "slug",
                  label: {
                    en: "External ID(Username)",
                    fr: "ID externe (nom d'utilisateur)",
                    pt: "ID externo (nome de usuário)",
                  },
                }),
                airtableColumnSelect({
                  tableField: "contributorTableId",
                  name: "name",
                  label: {
                    en: "Contributor Name Column",
                    fr: "Colonne de nom de contributeur",
                    pt: "Coluna de nome do colaborador",
                  },
                }),
                {
                  name: "description",
                  type: "group",
                  admin: {
                    hideGutter: true,
                  },
                  label: {
                    en: "Description",
                    fr: "Description",
                    pt: "Descrição",
                  },
                  fields: [
                    airtableColumnSelect({
                      tableField: "contributorTableId",

                      name: "english",
                      label: {
                        en: "Description(English)",
                        fr: "Description (anglais)",
                        pt: "Descrição (inglês)",
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "contributorTableId",

                      name: "french",
                      label: {
                        en: "Description(French)",
                        fr: "Description (français)",
                        pt: "Descrição (francês)",
                      },
                      admin: {
                        condition: (siblingData) => siblingData?.localized,
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "contributorTableId",

                      name: "portuguese",
                      label: {
                        en: "Description(Portuguese)",
                        fr: "Description (portugais)",
                        pt: "Descrição (português)",
                      },
                      admin: {
                        condition: (siblingData) => siblingData?.localized,
                      },
                    }),
                  ],
                },

                sourceField({ tableField: "contributorTableId" }),
              ],
            },
          ],
        },
        {
          type: "collapsible",
          label: {
            en: "OrganisationTable",
            fr: "Organisation",
            pt: "Organização",
          },
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: "organisationTableId",
              label: {
                en: "OrganisationTable Name",
                fr: "Nom d'organisation",
                pt: "Nome de organização",
              },
              required: true,
              validate: validateTableSelect,
              type: "text",
              admin: {
                description: () =>
                  "Enter Airtable Base above to select a table",
                components: {
                  Field: AirtableTableSelect,
                },
              },
            },
            {
              name: "organisationTableColumns",
              type: "group",
              admin: {
                hideGutter: true,
              },
              fields: [
                airtableColumnSelect({
                  tableField: "organisationTableId",
                  name: "slug",
                  label: {
                    en: "Organisation Username Column",
                    fr: "Colonne de nom d'utilisateur d'organisation",
                    pt: "Coluna de nome de usuário da organização",
                  },
                }),
                {
                  name: "description",
                  type: "group",
                  admin: {
                    hideGutter: true,
                  },
                  label: {
                    en: "Description",
                    fr: "Description",
                    pt: "Descrição",
                  },
                  fields: [
                    airtableColumnSelect({
                      tableField: "organisationTableId",

                      name: "english",
                      label: {
                        en: "Description(English)",
                        fr: "Description (anglais)",
                        pt: "Descrição (inglês)",
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "organisationTableId",

                      name: "french",
                      label: {
                        en: "Description(French)",
                        fr: "Description (français)",
                        pt: "Descrição (francês)",
                      },
                      admin: {
                        condition: (siblingData) => siblingData?.localized,
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "organisationTableId",

                      name: "portuguese",
                      label: {
                        en: "Description(Portuguese)",
                        fr: "Description (portugais)",
                        pt: "Descrição (português)",
                      },
                      admin: {
                        condition: (siblingData) => siblingData?.localized,
                      },
                    }),
                  ],
                },
                airtableColumnSelect({
                  tableField: "organisationTableId",
                  name: "type",
                  label: {
                    en: "Organisation Type Column",
                    fr: "Colonne de type organisation",
                    pt: "Coluna do tipo de organização",
                  },
                }),
                sourceField({ tableField: "organisationTableId" }),
                airtableColumnSelect({
                  tableField: "organisationTableId",
                  name: "url",
                  label: { en: "URL", fr: "URL", pt: "Url" },
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default Ecosystem;
