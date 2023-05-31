import { array } from "payload/dist/fields/validations";

const sortOptions = [
  "metadata_created desc",
  "metadata_created asc",
  "name asc",
  "name desc",
  "relevance desc",
  "relevance asc",
  "metadata_modified desc",
  "metadata_modified asc",
  "author asc",
  "author desc",
];

const documentSortOptions = [
  "created_at",
  "score",
  "title",
  "page_count",
  "source",
];

const DatasetsAndDocuments = {
  slug: "datasetsAndDocuments",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "Datasets",
            fr: "Ensembles de données",
            pt: "Conjuntos de dados",
          },
          description: {
            en: "Configure the datasets block",
            fr: "Configurez le bloc de jeux de données",
            pt: "Configure o bloco de conjuntos de dados",
          },
          fields: [
            {
              label: {
                en: "Search & Filter Values",
                fr: "Valeurs de recherche et de filtrage",
                pt: "Valores de pesquisa e filtro",
              },
              type: "collapsible",
              fields: [
                {
                  name: "sortOptions",
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
                      options: sortOptions.map((value) => {
                        return {
                          value,
                          label: value,
                        };
                      }),
                      unique: true,
                      required: true,
                      validate: (val, options) => {
                        const { data, t } = options || {};
                        if (
                          data?.options?.filter((l) => l.value === val)
                            ?.length > 1
                        ) {
                          return t("charterafrica.site:uniqueSortOptions");
                        }
                        return array(val, options);
                      },
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
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: ({ data }) => {
                        return data?.label || data?.value || data?.id;
                      },
                    },
                  },
                },
              ],
            },
            {
              label: {
                en: "Search & Filter Labels",
                fr: "Étiquettes de recherche et de filtrage",
                pt: "Rótulos de pesquisa e filtro",
              },
              type: "collapsible",
              fields: [
                {
                  name: "labels",
                  type: "group",
                  label: {
                    en: "Labels",
                    fr: "Étiquettes",
                    pt: "Rótulos",
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "search",
                          type: "text",
                          label: {
                            en: "Search Label",
                            fr: "Étiquette de recherche",
                            pt: "Rótulo de pesquisa",
                          },
                          required: true,
                          localized: true,
                          admin: {
                            width: "50%",
                          },
                        },
                        {
                          name: "sort",
                          type: "text",
                          label: {
                            en: "Sort Label",
                            fr: "Étiquette de tri",
                            pt: "Rótulo de classificação",
                          },
                          required: true,
                          localized: true,
                          admin: {
                            width: "50%",
                          },
                        },
                        {
                          name: "countries",
                          type: "text",
                          label: {
                            en: "Countries Label",
                            fr: "Étiquette des pays",
                            pt: "Rótulo dos países",
                          },
                          required: true,
                          localized: true,
                          admin: {
                            width: "50%",
                          },
                        },
                        {
                          name: "tags",
                          type: "text",
                          label: {
                            en: "Tags Label",
                            fr: "Étiquette des tags",
                            pt: "Rótulo das tags",
                          },
                          required: true,
                          localized: true,
                          admin: {
                            width: "50%",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: {
            en: "Documents",
            fr: "Documents",
            pt: "Documentos",
          },
          description: {
            en: "Configure the documents block",
            fr: "Configurez le bloc de documents",
            pt: "Configure o bloco de documentos",
          },
          fields: [
            {
              label: {
                en: "Documents",
                fr: "Documents",
                pt: "Documentos",
              },
              type: "collapsible",
              fields: [
                {
                  name: "showDocuments",
                  type: "checkbox",
                  label: {
                    en: "Show Documents",
                    fr: "Afficher les documents",
                    pt: "Mostrar documentos",
                  },
                  defaultValue: true,
                },
                {
                  name: "documents",
                  type: "group",
                  label: {
                    en: "Documents",
                    fr: "Documents",
                    pt: "Documentos",
                  },
                  fields: [
                    {
                      name: "groupID",
                      type: "text",
                      label: {
                        en: "Group ID",
                        fr: "ID de groupe",
                        pt: "ID do grupo",
                      },
                      required: true,
                    },
                    {
                      name: "options",
                      label: {
                        en: "Options",
                        fr: "Options",
                        pt: "Opções",
                      },
                      type: "group",
                      fields: [
                        {
                          type: "row",
                          fields: [
                            {
                              name: "showNotes",
                              label: {
                                en: "Show Notes",
                                fr: "Afficher les notes",
                                pt: "Mostrar notas",
                              },
                              type: "checkbox",
                              defaultValue: true,
                              required: true,
                            },
                            {
                              name: "showSearch",
                              label: {
                                en: "Show Search",
                                fr: "Afficher la recherche",
                                pt: "Mostrar pesquisa",
                              },
                              type: "checkbox",
                              defaultValue: false,
                              required: true,
                            },
                            {
                              name: "showText",
                              label: {
                                en: "Show Text",
                                fr: "Afficher le texte",
                                pt: "Mostrar texto",
                              },
                              type: "checkbox",
                              defaultValue: false,
                              required: true,
                            },
                            {
                              name: "showZoom",
                              label: {
                                en: "Show Zoom",
                                fr: "Afficher le zoom",
                                pt: "Mostrar zoom",
                              },
                              type: "checkbox",
                              defaultValue: false,
                              required: true,
                            },
                          ],
                        },
                      ],
                      admin: {
                        hideGutter: true,
                      },
                    },
                  ],
                  admin: {
                    condition: (_, siblingData) => siblingData?.showDocuments,
                  },
                },
              ],
            },
            {
              label: {
                en: "Search & Filter Labels",
                fr: "Étiquettes de recherche et de filtrage",
                pt: "Rótulos de pesquisa e filtro",
              },
              type: "collapsible",
              fields: [
                {
                  name: "labels",
                  type: "group",
                  label: {
                    en: "Labels",
                    fr: "Étiquettes",
                    pt: "Rótulos",
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "documentsSearch",
                          type: "text",
                          label: {
                            en: "Search Label",
                            fr: "Étiquette de recherche",
                            pt: "Rótulo de pesquisa",
                          },
                          required: true,
                          localized: true,
                          admin: {
                            width: "50%",
                          },
                        },
                        {
                          name: "documentsSort",
                          type: "text",
                          label: {
                            en: "Sort Label",
                            fr: "Étiquette de tri",
                            pt: "Rótulo de classificação",
                          },
                          required: true,
                          localized: true,
                          admin: {
                            width: "50%",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: {
                en: "Search & Filter Values",
                fr: "Valeurs de recherche et de filtrage",
                pt: "Valores de pesquisa e filtro",
              },
              type: "collapsible",
              fields: [
                {
                  name: "documentsSortOptions",
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
                      options: documentSortOptions.map((value) => {
                        return {
                          value,
                          label: value,
                        };
                      }),
                      unique: true,
                      required: true,
                      validate: (val, options) => {
                        const { data, t } = options || {};
                        if (
                          data?.options?.filter((l) => l.value === val)
                            ?.length > 1
                        ) {
                          return t("charterafrica.site:uniqueSortOptions");
                        }
                        return array(val, options);
                      },
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
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: ({ data }) => {
                        return data?.label || data?.value || data?.id;
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: {
        en: "Common Labels",
        fr: "Étiquettes communes",
        pt: "Rótulos comuns",
      },
      type: "collapsible",
      fields: [
        {
          name: "commonLabels",
          type: "group",
          label: {
            en: "Labels",
            fr: "Étiquettes",
            pt: "Rótulos",
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "readMore",
                  type: "text",
                  label: {
                    en: "Read More Label",
                    fr: "Lire la suite",
                    pt: "Leia mais",
                  },
                  required: true,
                  localized: true,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "readLess",
                  type: "text",
                  label: {
                    en: "Read Less Label",
                    fr: "Lire moins",
                    pt: "Leia menos",
                  },
                  required: true,
                  localized: true,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "updated",
                  type: "text",
                  label: {
                    en: "Updated At Label",
                    fr: "Mis à jour à l'étiquette",
                    pt: "Atualizado em",
                  },
                  required: true,
                  localized: true,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "created",
                  type: "text",
                  label: {
                    en: "Created At Label",
                    fr: "Créé à l'étiquette",
                    pt: "Criado em",
                  },
                  required: true,
                  localized: true,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "openDataset",
                  type: "text",
                  label: {
                    en: "Open Dataset Label",
                    fr: "Ouvrir l'étiquette de jeu de données",
                    pt: "Abrir rótulo do conjunto de dados",
                  },
                  required: true,
                  localized: true,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "backToDatasets",
                  type: "text",
                  label: {
                    en: "Back to Datasets Label",
                    fr: "Retour aux étiquettes de jeux de données",
                    pt: "Voltar para rótulos de conjuntos de dados",
                  },
                  required: true,
                  localized: true,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "seeMoreDatasets",
                  type: "text",
                  label: {
                    en: "See More Datasets Label",
                    fr: "Voir plus d'étiquettes de jeux de données",
                    pt: "Ver mais rótulos de conjuntos de dados",
                  },
                  required: true,
                  localized: true,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "shareDataset",
                  type: "text",
                  label: {
                    en: "Share Dataset Label",
                    fr: "Partager l'étiquette de jeu de données",
                    pt: "Compartilhar rótulo do conjunto de dados",
                  },
                  required: true,
                  localized: true,
                  admin: {
                    width: "50%",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default DatasetsAndDocuments;
