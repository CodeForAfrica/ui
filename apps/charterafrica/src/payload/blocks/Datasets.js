import filterBar from "../fields/filterBar";
import linkGroup from "../fields/linkGroup";
import defaultValue from "../utils/defaultValues";
import validateUniqueArrayFieldSelect from "../utils/validateUniqueArrayFieldSelect";

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

const Datasets = {
  slug: "datasets",
  labels: {
    singular: {
      en: "Datasets",
      fr: "Ensembles de données",
      pt: "Conjuntos de dados",
    },
    plural: {
      en: "Datasets",
      fr: "Ensembles de données",
      pt: "Conjuntos de dados",
    },
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
        filterBar({
          overrides: {
            fields: [
              {
                name: "search",
                type: "group",
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
                admin: {
                  hideGutter: true,
                },
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
                        required: true,
                        options: sortOptions,
                        validate: validateUniqueArrayFieldSelect(
                          "options",
                          "value",
                          sortOptions,
                          "charterafrica.site:uniqueSortOptions",
                        ),
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
                          return data?.label || data?.value || data?.id;
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
        }),
      ],
    },
    {
      type: "collapsible",
      label: {
        en: "Labels",
        fr: "Étiquettes",
        pt: "Rótulos",
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
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "datasets",
                  type: "text",
                  label: {
                    en: "Datasets",
                    fr: "Ensembles de données",
                    pt: "Conjuntos de dados",
                  },
                  defaultValue: defaultValue({
                    en: "Datasets",
                    fr: "Ensembles de données",
                    pt: "Conjuntos de dados",
                  }),
                  required: true,
                  localized: true,
                },
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
          admin: {
            hideGutter: true,
          },
        },
      ],
    },
    {
      type: "collapsible",
      label: {
        en: "Documents",
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
          defaultValue: false,
        },
        linkGroup({
          linkConfig: {
            disableLinkTypeSelection: true,
            disableOpenInNewTab: true,
          },
          overrides: {
            name: "documents",
            admin: {
              condition: (_, siblingData) => siblingData?.showDocuments,
              hideGutter: true,
            },
          },
        }),
      ],
    },
  ],
};

export default Datasets;
