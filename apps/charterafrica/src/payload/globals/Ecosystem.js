import airtableBaseSelect, {
  schema,
} from "../fields/ecosystem/airtableBaseSelect";
import airtableColumnSelect from "../fields/ecosystem/airtableColumnSelect";
import airtableTableSelect from "../fields/ecosystem/airtableTableSelect";
import socialMediaColumns from "../fields/ecosystem/socialMediaFields";
import sourceField from "../fields/ecosystem/sourceField";
import { ECOSYSTEM_GLOBAL } from "../utils/collections";

const Ecosystem = {
  slug: ECOSYSTEM_GLOBAL,
  label: { en: "Ecosystem", fr: "Écosystème", pt: "Ecossistema" },
  access: {
    read: () => true,
    update: () => true,
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
              schema,
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
                  schema,
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
                  schema,
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
                  schema,
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
                      schema,
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
                      schema,
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
                      schema,
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
                      schema,
                      tableField: "toolTableId",
                      overrides: {
                        name: "en",
                        label: {
                          en: "Theme (English)",
                          fr: "Thème (anglais)",
                          pt: "Tema (inglês)",
                        },
                      },
                    }),
                    airtableColumnSelect({
                      schema,
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
                      schema,
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
                  schema,
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
                  schema,
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
                  schema,
                  tableField: "toolTableId",
                  overrides: {
                    name: "url",
                    label: {
                      en: "Website",
                    },
                  },
                }),
                sourceField({ tableField: "toolTableId", schema }),
                airtableColumnSelect({
                  schema,
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
                  schema,
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
                  schema,
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
                  schema,
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
                airtableColumnSelect({
                  schema,
                  tableField: "toolTableId",
                  overrides: {
                    name: "classification",
                    label: {
                      en: "Collection",
                      fr: "Collection",
                      pt: "Coleção",
                    },
                  },
                }),
                socialMediaColumns({ schema, tableField: "toolTableId" }),
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
              schema,
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
                  schema,
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
                  schema,
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
                  schema,
                  tableField: "contributorTableId",
                  overrides: {
                    name: "role",
                    label: { en: "Role", fr: "Rôle", pt: "Função" },
                  },
                }),
                airtableColumnSelect({
                  schema,
                  tableField: "contributorTableId",
                  overrides: {
                    name: "currentOrganisation",
                    label: {
                      en: "Current Organisation",
                      fr: "Organisation actuelle",
                      pt: "Organização atual",
                    },
                  },
                }),
                airtableColumnSelect({
                  schema,
                  tableField: "contributorTableId",
                  overrides: {
                    name: "organisations",
                    label: {
                      en: "Organisations",
                      fr: "Organisations",
                      pt: "Organizações",
                    },
                  },
                }),
                airtableColumnSelect({
                  schema,
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
                      schema,
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
                      schema,
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
                      schema,
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
                  schema,
                  tableField: "contributorTableId",
                  overrides: {
                    name: "classification",
                    label: {
                      en: "Collection",
                      fr: "Collection",
                      pt: "Coleção",
                    },
                  },
                }),
                socialMediaColumns({
                  schema,
                  tableField: "contributorTableId",
                }),
                sourceField({ tableField: "contributorTableId", schema }),
              ],
            },
          ],
        },
        {
          type: "collapsible",
          label: {
            en: "Organisation Table",
            fr: "Organisation",
            pt: "Organização",
          },
          admin: {
            initCollapsed: true,
          },
          fields: [
            airtableTableSelect({
              schema,
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
                  schema,
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
                  schema,
                  tableField: "organisationTableId",
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
                  schema,
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
                      schema,
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
                      schema,
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
                      schema,
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
                  schema,
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
                  schema,
                  tableField: "organisationTableId",
                  overrides: {
                    name: "classification",
                    label: {
                      en: "Collection",
                      fr: "Collection",
                      pt: "Coleção",
                    },
                  },
                }),
                socialMediaColumns({
                  schema,
                  tableField: "organisationTableId",
                }),
                airtableColumnSelect({
                  schema,
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
                  schema,
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
                  schema,
                  tableField: "organisationTableId",
                  overrides: {
                    name: "tools",
                    label: { en: "Tools", fr: "Outils", pt: "Ferramentas" },
                  },
                }),
                sourceField({ tableField: "organisationTableId", schema }),
                airtableColumnSelect({
                  schema,
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
              schema,
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
                  schema,
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
                  schema,
                  tableField: "partnersTableId",
                  overrides: {
                    name: "url",
                    label: {
                      en: "Website",
                    },
                  },
                }),
                airtableColumnSelect({
                  schema,
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
      ],
    },
  ],
};

export default Ecosystem;
