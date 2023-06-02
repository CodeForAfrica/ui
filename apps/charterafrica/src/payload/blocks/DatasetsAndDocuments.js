import { array } from "payload/dist/fields/validations";

import defaultValue from "../utils/defaultValues";

const datasetsSortOptions = [
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
                  defaultValue: defaultValue({
                    en: "Read More",
                    fr: "Lire la suite",
                    pt: "Leia mais",
                  }),
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
                  defaultValue: defaultValue({
                    en: "Read Less",
                    fr: "Lire moins",
                    pt: "Leia menos",
                  }),
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
                  defaultValue: defaultValue({
                    en: "Updated",
                    fr: "Mis à jour",
                    pt: "Atualizado",
                  }),
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
                  defaultValue: defaultValue({
                    en: "Created",
                    fr: "Créé",
                    pt: "Criado",
                  }),
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
                  defaultValue: defaultValue({
                    en: "Open Dataset",
                    fr: "Ouvrir le jeu de données",
                    pt: "Abrir conjunto de dados",
                  }),
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
                  defaultValue: defaultValue({
                    en: "Back to Datasets",
                    fr: "Retour aux jeux de données",
                    pt: "Voltar para conjuntos de dados",
                  }),
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
                  defaultValue: defaultValue({
                    en: "See More Datasets",
                    fr: "Voir plus de jeux de données",
                    pt: "Ver mais conjuntos de dados",
                  }),
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
                  defaultValue: defaultValue({
                    en: "Share Dataset",
                    fr: "Partager le jeu de données",
                    pt: "Compartilhar conjunto de dados",
                  }),
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
      type: "tabs",
      tabs: [
        {
          label: {
            en: "Datasets",
            fr: "Ensembles de données",
            pt: "Conjuntos de dados",
          },
          fields: [
            {
              name: "datasets",
              type: "group",
              admin: {
                hideGutter: true,
              },
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
                      options: datasetsSortOptions.map((value) => {
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
                {
                  name: "labels",
                  type: "group",
                  label: {
                    en: "Labels",
                    fr: "Étiquettes",
                    pt: "Rótulos",
                  },
                  admin: {
                    hideGutter: true,
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
                          defaultValue: defaultValue({
                            en: "Search",
                            fr: "Rechercher",
                            pt: "Pesquisar",
                          }),
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
                          defaultValue: defaultValue({
                            en: "Sort",
                            fr: "Trier",
                            pt: "Classificar",
                          }),
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
                          defaultValue: defaultValue({
                            en: "Countries",
                            fr: "Pays",
                            pt: "Países",
                          }),
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
                          defaultValue: defaultValue({
                            en: "Tags",
                            fr: "Tags",
                            pt: "Tags",
                          }),
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
              name: "documents",
              type: "group",
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
                    hideGutter: true,
                  },
                },
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
                    condition: (_, siblingData) => siblingData?.showDocuments,
                  },
                },
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
                          defaultValue: defaultValue({
                            en: "Search",
                            fr: "Rechercher",
                            pt: "Pesquisar",
                          }),
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
                          defaultValue: defaultValue({
                            en: "Sort",
                            fr: "Trier",
                            pt: "Classificar",
                          }),
                          required: true,
                          localized: true,
                          admin: {
                            width: "50%",
                          },
                        },
                      ],
                    },
                  ],
                  admin: {
                    hideGutter: true,
                    condition: (_, siblingData) => siblingData?.showDocuments,
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
