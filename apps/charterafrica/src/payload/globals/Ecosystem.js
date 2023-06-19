import { ECOSYSTEM_GLOBAL } from "../../lib/ecosystem/models";
import airtableBaseSelect from "../fields/ecosystem/airtableBaseSelect";
import airtableColumnSelect from "../fields/ecosystem/airtableColumnSelect";
import airtableTableSelect from "../fields/ecosystem/airtableTableSelect";
import sourceField from "../fields/ecosystem/sourceField";

const Ecosystem = {
  slug: ECOSYSTEM_GLOBAL,
  label: { en: "Ecosystem", fr: "Écosystème", pt: "Ecossistema" },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "collapsible",
      label: { en: "Airtable Base", fr: "Base aérinable", pt: "Base aérea" },
      fields: [
        airtableBaseSelect(),
        {
          name: "localized",
          type: "checkbox",
          label: {
            en: "Enable translations",
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
        condition: (siblingData) => siblingData?.baseId,
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
            airtableTableSelect({
              name: "toolTableId",
              label: {
                en: "Table Name",
                fr: "Nom du tableau",
                pt: "Nome da tabela",
              },
            }),
            {
              name: "toolTableColumns",
              label: {
                en: "Columns",
                fr: "Colonnes",
                pt: "Colunas",
              },
              type: "group",
              admin: {
                hideGutter: true,
              },
              fields: [
                airtableColumnSelect({
                  tableField: "toolTableId",
                  overrides: {
                    name: "slug",
                    label: {
                      en: "External Id",
                      fr: "Identification externe",
                      pt: "Identificação externa",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "toolTableId",
                  overrides: {
                    name: "name",
                    label: {
                      en: "Name",
                      fr: "Nom",
                      pt: "Nome",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "toolTableId",
                  overrides: {
                    name: "avatarUrl",
                    label: { en: "Image", fr: "Image", pt: "Imagem" },
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
                      overrides: {
                        name: "en",
                        label: {
                          en: "Description (English)",
                          fr: "Description (anglais)",
                          pt: "Descrição (inglês)",
                        },
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "toolTableId",
                      overrides: {
                        name: "fr",
                        label: {
                          en: "Description (French)",
                          fr: "Description (français)",
                          pt: "Descrição (francês)",
                        },
                        admin: {
                          condition: (siblingData) => siblingData?.localized,
                        },
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "toolTableId",
                      overrides: {
                        name: "pt",
                        label: {
                          en: "Description (Portuguese)",
                          fr: "Description (portugais)",
                          pt: "Descrição (português)",
                        },
                        admin: {
                          condition: (siblingData) => siblingData?.localized,
                        },
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
                      overrides: {
                        name: "pt",
                        label: {
                          en: "Theme (English)",
                          fr: "Thème (anglais)",
                          pt: "Tema (inglês)",
                        },
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "toolTableId",
                      overrides: {
                        name: "fr",
                        label: {
                          en: "Theme (French)",
                          fr: "Thème (français)",
                          pt: "Tema (francês)",
                        },
                        admin: {
                          condition: (siblingData) => siblingData?.localized,
                        },
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "toolTableId",
                      overrides: {
                        name: "pt",
                        label: {
                          en: "Theme(Portuguese)",
                          fr: "Thème (portugais)",
                          pt: "Tema (português)",
                        },
                        admin: {
                          condition: (siblingData) => siblingData?.localized,
                        },
                      },
                    }),
                  ],
                },
                airtableColumnSelect({
                  tableField: "toolTableId",
                  overrides: {
                    name: "homeCountry",
                    label: {
                      en: "Home Country",
                      fr: "Campagne d'origine",
                      pt: "País natal",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "toolTableId",
                  overrides: {
                    name: "operatingCountries",
                    label: {
                      en: "Operating Countries",
                      fr: "Pays opérationnels",
                      pt: "Países operacionais",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "toolTableId",
                  overrides: {
                    name: "url",
                    label: {
                      en: "Website",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "toolTableId",
                  overrides: {
                    name: "socialMedia",
                    label: {
                      en: "Social Media",
                      fr: "Réseaux sociaux",
                      pt: "Mídia social",
                    },
                  },
                }),
                sourceField({ tableField: "toolTableId" }),
                airtableColumnSelect({
                  tableField: "toolTableId",
                  overrides: {
                    name: "contributors",
                    label: {
                      en: "Contributors",
                      fr: "Contributeurs",
                      pt: "Colaboradores",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "toolTableId",
                  overrides: {
                    name: "organisation",
                    label: {
                      en: "Organisation",
                      fr: "Organisation",
                      pt: "Organização",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "toolTableId",
                  overrides: {
                    name: "partners",
                    label: {
                      en: "Partners",
                      fr: "Partenaires",
                      pt: "Parceiros",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "toolTableId",
                  overrides: {
                    name: "supporters",
                    label: {
                      en: "Supporters",
                      fr: "Partisans",
                      pt: "Apoiadores",
                    },
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
            airtableTableSelect({
              name: "contributorTableId",
              label: {
                en: "Table Name",
                fr: "Nom du tableau",
                pt: "Nome da tabela",
              },
            }),
            {
              name: "contributorTableColumns",
              label: {
                en: "Columns",
                fr: "Colonnes",
                pt: "Colunas",
              },
              type: "group",
              admin: {
                hideGutter: true,
              },
              fields: [
                airtableColumnSelect({
                  tableField: "contributorTableId",
                  overrides: {
                    name: "slug",
                    label: {
                      en: "Username",
                      fr: "Nom d'utilisateur",
                      pt: "Nome de usuário",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "contributorTableId",
                  overrides: {
                    name: "name",
                    label: {
                      en: "Name",
                      fr: "Nom",
                      pt: "Nome",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "contributorTableId",
                  overrides: {
                    name: "avatarUrl",
                    label: { en: "Image", fr: "Image", pt: "Imagem" },
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
                  fields: [
                    airtableColumnSelect({
                      tableField: "contributorTableId",
                      overrides: {
                        name: "en",
                        label: {
                          en: "Description (English)",
                          fr: "Description (anglais)",
                          pt: "Descrição (inglês)",
                        },
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "contributorTableId",
                      overrides: {
                        name: "fr",
                        label: {
                          en: "Description (French)",
                          fr: "Description (français)",
                          pt: "Descrição (francês)",
                        },
                        admin: {
                          condition: (siblingData) => siblingData?.localized,
                        },
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "contributorTableId",
                      overrides: {
                        name: "pt",
                        label: {
                          en: "Description (Portuguese)",
                          fr: "Description (portugais)",
                          pt: "Descrição (português)",
                        },
                        admin: {
                          condition: (siblingData) => siblingData?.localized,
                        },
                      },
                    }),
                  ],
                  admin: {
                    hideGutter: true,
                  },
                },
                airtableColumnSelect({
                  tableField: "contributorTableId",
                  overrides: {
                    name: "socialMedia",
                    label: {
                      en: "Social Media",
                      fr: "Réseaux sociaux",
                      pt: "Mídia social",
                    },
                  },
                }),
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
            airtableTableSelect({
              name: "organisationTableId",
              label: {
                en: "Table Name",
                fr: "Nom du tableau",
                pt: "Nome da tabela",
              },
            }),
            {
              name: "organisationTableColumns",
              label: {
                en: "Columns",
                fr: "Colonnes",
                pt: "Colunas",
              },
              type: "group",
              admin: {
                hideGutter: true,
              },
              fields: [
                airtableColumnSelect({
                  tableField: "organisationTableId",
                  overrides: {
                    name: "slug",
                    label: {
                      en: "Username",
                      fr: "nom d'utilisateur",
                      pt: "nome de usuário",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "organisationTableId",
                  overrides: {
                    name: "avatarUrl",
                    label: { en: "Image", fr: "Image", pt: "Imagem" },
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
                      overrides: {
                        name: "en",
                        label: {
                          en: "Description (English)",
                          fr: "Description (anglais)",
                          pt: "Descrição (inglês)",
                        },
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "organisationTableId",
                      overrides: {
                        name: "fr",
                        label: {
                          en: "Description (French)",
                          fr: "Description (français)",
                          pt: "Descrição (francês)",
                        },
                        admin: {
                          condition: (siblingData) => siblingData?.localized,
                        },
                      },
                    }),
                    airtableColumnSelect({
                      tableField: "organisationTableId",
                      overrides: {
                        name: "pt",
                        label: {
                          en: "Description (Portuguese)",
                          fr: "Description (portugais)",
                          pt: "Descrição (português)",
                        },
                        admin: {
                          condition: (siblingData) => siblingData?.localized,
                        },
                      },
                    }),
                  ],
                },
                airtableColumnSelect({
                  tableField: "organisationTableId",
                  overrides: {
                    name: "type",
                    label: {
                      en: "Type",
                      pt: "Tipo",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "organisationTableId",
                  overrides: {
                    name: "socialMedia",
                    label: {
                      en: "Social Media",
                      fr: "Réseaux sociaux",
                      pt: "Mídia social",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "organisationTableId",
                  overrides: {
                    name: "partners",
                    label: {
                      en: "Partners",
                      fr: "Partenaires",
                      pt: "Parceiros",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "organisationTableId",
                  overrides: {
                    name: "supporters",
                    label: {
                      en: "Supporters",
                      fr: "Partisans",
                      pt: "Apoiadores",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "organisationTableId",
                  overrides: {
                    name: "tools",
                    label: { en: "Tools", fr: "Outils", pt: "Ferramentas" },
                  },
                }),
                sourceField({ tableField: "organisationTableId" }),
                airtableColumnSelect({
                  tableField: "organisationTableId",
                  overrides: {
                    name: "url",
                    label: { en: "Website" },
                  },
                }),
              ],
            },
          ],
        },
        {
          type: "collapsible",
          label: {
            en: "Partners and Supporters",
            fr: "Partenaires et supporters",
            pt: "Parceiros e apoiadores",
          },
          admin: {
            initCollapsed: true,
          },
          fields: [
            airtableTableSelect({
              name: "partnersTableId",
              label: {
                en: "Table Name",
                fr: "Nom du tableau",
                pt: "Nome da tabela",
              },
            }),
            {
              type: "group",
              name: "partnerTableColumns",
              label: {
                en: "Columns",
                fr: "Colonnes",
                pt: "Colunas",
              },
              admin: {
                hideGutter: true,
              },
              fields: [
                airtableColumnSelect({
                  tableField: "partnersTableId",
                  overrides: {
                    name: "name",
                    label: {
                      en: "Name",
                      fr: "Nom",
                      pt: "Nome",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "partnersTableId",
                  overrides: {
                    name: "url",
                    label: {
                      en: "Website",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "partnersTableId",
                  overrides: {
                    name: "logo",
                    label: { en: "Logo", fr: "Logo", pt: "Logotipo" },
                  },
                }),
              ],
            },
          ],
        },
        {
          type: "collapsible",
          label: {
            en: "Social Media",
            fr: "Réseaux sociaux",
            pt: "Mídia social",
          },
          admin: {
            initCollapsed: true,
          },
          fields: [
            airtableTableSelect({
              name: "socialMediaTableId",
              label: {
                en: "Table Name",
                fr: "Nom du tableau",
                pt: "Nome da tabela",
              },
            }),
            {
              type: "group",
              name: "socialMediaTableColumns",
              label: {
                en: "Columns",
                fr: "Colonnes",
                pt: "Colunas",
              },
              admin: {
                hideGutter: true,
              },
              fields: [
                airtableColumnSelect({
                  tableField: "socialMediaTableId",
                  overrides: {
                    name: "name",
                    label: {
                      en: "Name",
                      fr: "Nom",
                      pt: "Nome",
                    },
                  },
                }),
                airtableColumnSelect({
                  tableField: "socialMediaTableId",
                  overrides: {
                    name: "url",
                    label: {
                      en: "URL",
                    },
                  },
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
