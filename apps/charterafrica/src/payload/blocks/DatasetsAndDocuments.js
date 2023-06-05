import { array } from "payload/dist/fields/validations";

import filterBar from "../fields/filterbar";
import groupedLabels from "../fields/groupedLabels";
import selectField from "../fields/selectField";
import simpleLabel from "../fields/simpleLabel";
import sourceAfricaDocument from "../fields/sourceAfricaDocument";
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
              name: "showDatasets",
              type: "checkbox",
              label: {
                en: "Show Datasets",
                fr: "Afficher les ensembles de données",
                pt: "Mostrar conjuntos de dados",
              },
              defaultValue: true,
            },
            {
              name: "datasets",
              type: "group",
              admin: {
                hideGutter: true,
                condition: (_, siblingData) => siblingData?.showDatasets,
              },
              fields: [
                {
                  type: "collapsible",
                  label: {
                    en: "Datasets Source",
                    fr: "Source des ensembles de données",
                    pt: "Fonte de conjuntos de dados",
                  },
                  fields: [
                    simpleLabel({
                      name: "organizationId",
                      label: {
                        en: "Organization ID",
                        fr: "ID de l'organisation",
                        pt: "ID da organização",
                      },
                      localized: false,
                    }),
                  ],
                },
                {
                  type: "collapsible",
                  label: {
                    en: "Filter Bar",
                    fr: "Barre de filtre",
                    pt: "Barra de filtro",
                  },
                  fields: [
                    filterBar({
                      fields: [
                        {
                          type: "collapsible",
                          label: {
                            en: "Search Input",
                            fr: "Entrée de recherche",
                            pt: "Entrada de pesquisa",
                          },
                          fields: [
                            {
                              name: "search",
                              type: "group",
                              admin: {
                                hideGutter: true,
                              },
                              fields: [
                                simpleLabel({
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
                                }),
                              ],
                            },
                          ],
                        },
                        {
                          type: "collapsible",
                          label: {
                            en: "Sort Filter",
                            fr: "Filtre de tri",
                            pt: "Filtro de classificação",
                          },
                          fields: [
                            {
                              name: "sort",
                              type: "group",
                              admin: {
                                hideGutter: true,
                              },
                              fields: [
                                {
                                  name: "options",
                                  type: "array",
                                  minRows: 1,
                                  label: {
                                    en: "Sort Options",
                                    fr: "Options de tri",
                                    pt: "Opções de classificação",
                                  },
                                  fields: [
                                    selectField({
                                      name: "value",
                                      options: datasetsSortOptions.map(
                                        (value) => ({
                                          value,
                                          label: value,
                                        })
                                      ),
                                      validate: (val, options) => {
                                        const { data, t } = options || {};
                                        if (
                                          data?.options?.filter(
                                            (l) => l.value === val
                                          )?.length > 1
                                        ) {
                                          return t(
                                            "charterafrica.site:uniqueSortOptions"
                                          );
                                        }
                                        return array(val, options);
                                      },
                                    }),
                                    simpleLabel({
                                      label: {
                                        en: "Label",
                                        fr: "Étiquette",
                                        pt: "Rótulo",
                                      },
                                    }),
                                  ],
                                  admin: {
                                    initCollapsed: true,
                                    components: {
                                      RowLabel: ({ data }) => {
                                        return (
                                          data?.label || data?.value || data?.id
                                        );
                                      },
                                    },
                                  },
                                },
                                simpleLabel({
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
                                }),
                              ],
                            },
                          ],
                        },
                        {
                          type: "collapsible",
                          label: {
                            en: "Countries Filter",
                            fr: "Filtre des pays",
                            pt: "Filtro de países",
                          },
                          fields: [
                            {
                              name: "countries",
                              type: "group",
                              admin: {
                                hideGutter: true,
                              },
                              fields: [
                                simpleLabel({
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
                                }),
                              ],
                            },
                          ],
                        },
                        {
                          type: "collapsible",
                          label: {
                            en: "Tags Filter",
                            fr: "Filtre des tags",
                            pt: "Filtro de tags",
                          },
                          fields: [
                            {
                              name: "tags",
                              type: "group",
                              admin: {
                                hideGutter: true,
                              },
                              fields: [
                                simpleLabel({
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
                                }),
                              ],
                            },
                          ],
                        },
                      ],
                    }),
                  ],
                },
                {
                  type: "collapsible",
                  label: {
                    en: "Datasets Labels",
                    fr: "Étiquettes des ensembles de données",
                    pt: "Rótulos dos conjuntos de dados",
                  },
                  fields: [
                    groupedLabels({
                      fields: [
                        {
                          type: "row",
                          fields: [
                            simpleLabel({
                              name: "readMore",
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
                            }),
                            simpleLabel({
                              name: "readLess",
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
                            }),
                            simpleLabel({
                              name: "updated",
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
                            }),
                            simpleLabel({
                              name: "created",
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
                            }),
                            simpleLabel({
                              name: "openDataset",
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
                            }),
                            simpleLabel({
                              name: "backToDatasets",
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
                            }),
                            simpleLabel({
                              name: "seeMoreDatasets",
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
                            }),
                            simpleLabel({
                              name: "shareDataset",
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
                            }),
                          ],
                        },
                      ],
                    }),
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
              admin: {
                condition: (_, siblingData) => siblingData?.showDocuments,
                hideGutter: true,
              },
              fields: [
                {
                  type: "collapsible",
                  label: {
                    en: "Documents Source",
                    fr: "Source des documents",
                    pt: "Fonte de documentos",
                  },
                  fields: [sourceAfricaDocument()],
                },
                {
                  type: "collapsible",
                  label: {
                    en: "Filter Bar",
                    fr: "Barre de filtre",
                    pt: "Barra de filtro",
                  },
                  fields: [
                    filterBar({
                      fields: [
                        {
                          type: "collapsible",
                          label: {
                            en: "Search Input",
                            fr: "Entrée de recherche",
                            pt: "Entrada de pesquisa",
                          },
                          fields: [
                            {
                              name: "search",
                              type: "group",
                              admin: {
                                hideGutter: true,
                              },
                              fields: [
                                {
                                  name: "label",
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
                                },
                              ],
                            },
                          ],
                        },
                        {
                          type: "collapsible",
                          label: {
                            en: "Sort Filter",
                            fr: "Filtre de tri",
                            pt: "Filtro de classificação",
                          },
                          fields: [
                            {
                              name: "sort",
                              type: "group",
                              admin: {
                                hideGutter: true,
                              },
                              fields: [
                                {
                                  name: "label",
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
                                },
                                {
                                  name: "options",
                                  type: "array",
                                  minRows: 1,
                                  label: {
                                    en: "Sort Options",
                                    fr: "Options de tri",
                                    pt: "Opções de classificação",
                                  },
                                  fields: [
                                    selectField({
                                      name: "value",
                                      options: documentSortOptions.map(
                                        (value) => {
                                          return {
                                            value,
                                            label: value,
                                          };
                                        }
                                      ),
                                      validate: (val, options) => {
                                        const { data, t } = options || {};
                                        if (
                                          data?.options?.filter(
                                            (l) => l.value === val
                                          )?.length > 1
                                        ) {
                                          return t(
                                            "charterafrica.site:uniqueSortOptions"
                                          );
                                        }
                                        return array(val, options);
                                      },
                                    }),
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
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    }),
                  ],
                },
                {
                  type: "collapsible",
                  label: {
                    en: "Documents Labels",
                    fr: "Étiquettes des documents",
                    pt: "Rótulos de documentos",
                  },
                  fields: [
                    groupedLabels({
                      fields: [
                        {
                          type: "row",
                          fields: [
                            simpleLabel({
                              name: "pages",
                              label: {
                                en: "No of Pages Label",
                                fr: "Nombre de pages",
                                pt: "Número de páginas",
                              },
                              defaultValue: defaultValue({
                                en: "Pages",
                                fr: "Pages",
                                pt: "Páginas",
                              }),
                            }),
                            simpleLabel({
                              name: "contributedBy",
                              label: {
                                en: "Contributed By",
                                fr: "Contributed By",
                                pt: "Contributed By",
                              },
                              defaultValue: defaultValue({
                                en: "Contributed By",
                                fr: "Contributed By",
                                pt: "Contributed By",
                              }),
                            }),
                          ],
                        },
                      ],
                    }),
                  ],
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
