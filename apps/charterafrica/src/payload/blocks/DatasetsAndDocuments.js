import { array } from "payload/dist/fields/validations";

import documentCloud from "../fields/documentCloud";
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
                    {
                      name: "organizationId",
                      type: "text",
                      required: true,
                      label: {
                        en: "Organization ID",
                        fr: "ID de l'organisation",
                        pt: "ID da organização",
                      },
                      localized: false,
                    },
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
                    {
                      name: "filterBar",
                      type: "group",
                      admin: {
                        hideGutter: true,
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
                              required: true,
                              localized: true,
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
                            },
                          ],
                        },
                        {
                          name: "sort",
                          type: "group",
                          admin: {
                            hideGutter: true,
                            style: {
                              marginTop: 10,
                            },
                          },
                          fields: [
                            {
                              name: "label",
                              type: "text",
                              required: true,
                              localized: true,
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
                                {
                                  name: "value",
                                  type: "select",
                                  unique: true,
                                  required: true,
                                  options: datasetsSortOptions.map((value) => ({
                                    value,
                                    label: value,
                                  })),
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
                                },
                                {
                                  name: "label",
                                  type: "text",
                                  required: true,
                                  localized: true,
                                  label: {
                                    en: "Label",
                                    fr: "Étiquette",
                                    pt: "Rótulo",
                                  },
                                },
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
                          ],
                        },
                        {
                          name: "countries",
                          type: "group",
                          admin: {
                            hideGutter: true,
                            style: {
                              marginTop: 10,
                            },
                          },
                          fields: [
                            {
                              name: "label",
                              type: "text",
                              required: true,
                              localized: true,
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
                            },
                          ],
                        },
                        {
                          name: "tags",
                          type: "group",
                          admin: {
                            hideGutter: true,
                            style: {
                              marginTop: 10,
                            },
                          },
                          fields: [
                            {
                              name: "label",
                              type: "text",
                              required: true,
                              localized: true,
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
                            },
                          ],
                        },
                      ],
                    },
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
                              name: "openDataset",
                              type: "text",
                              required: true,
                              localized: true,
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
                            },
                            {
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
                              type: "text",
                              required: true,
                              localized: true,
                            },
                            {
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
                              type: "text",
                              required: true,
                              localized: true,
                            },
                            {
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
                              type: "text",
                              required: true,
                              localized: true,
                            },
                          ],
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
                  fields: [
                    documentCloud({
                      name: "organization",
                      label: {
                        en: "Organization",
                        fr: "Organisation",
                        pt: "Organização",
                      },
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
                    {
                      name: "filterBar",
                      type: "group",
                      admin: {
                        hideGutter: true,
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
                        {
                          name: "sort",
                          type: "group",
                          admin: {
                            hideGutter: true,
                            style: {
                              marginTop: 10,
                            },
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
                                {
                                  name: "value",
                                  type: "select",
                                  unique: true,
                                  required: true,
                                  options: documentSortOptions.map((value) => {
                                    return {
                                      value,
                                      label: value,
                                    };
                                  }),
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
                            },
                          ],
                        },
                      ],
                    },
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
                              type: "text",
                              required: true,
                              localized: true,
                            },
                            {
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
                              type: "text",
                              required: true,
                              localized: true,
                            },
                          ],
                        },
                      ],
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
      type: "collapsible",
      label: {
        en: "Common Labels",
        fr: "Étiquettes communes",
        pt: "Rótulos comuns",
      },
      fields: [
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
                  type: "text",
                  required: true,
                  localized: true,
                },
                {
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
                  type: "text",
                  required: true,
                  localized: true,
                },
                {
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
                  type: "text",
                  required: true,
                  localized: true,
                },
                {
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
                  type: "text",
                  required: true,
                  localized: true,
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
