import { deepmerge } from "@mui/utils";

const link = ({ disableLabel = false, overrides = {} } = {}) => {
  const linkResult = {
    type: "row",
    fields: [
      {
        name: "linkType",
        type: "radio",
        options: [
          {
            label: {
              en: "Custom URL",
              fr: "URL personnalisée",
              pt: "URL personalizado",
            },
            value: "custom",
          },
          {
            label: {
              en: "Internal link",
              fr: "Lien interne",
              pt: "Link interno",
            },
            value: "internal",
          },
        ],
        defaultValue: "internal",
      },
    ],
  };

  const linkTypes = [
    {
      type: "row",
      fields: [
        {
          name: "doc",
          label: {
            en: "Document to link to",
            fr: "Document pour lien vers",
            pt: "Documento para link para",
          },
          type: "relationship",
          relationTo: ["pages"],
          required: true,
          maxDepth: 1,
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === "internal",
          },
        },
        {
          name: "url",
          label: {
            en: "Custom URL",
            fr: "URL personnalisée",
            pt: "URL personalizado",
          },
          type: "text",
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === "custom",
          },
        },
      ],
    },
  ];
  let labelFields = [];
  if (!disableLabel) {
    labelFields = [
      {
        type: "row",
        fields: [
          {
            name: "label",
            label: {
              en: "Label",
              pt: "Rótulo",
            },
            type: "text",
            required: true,
            localized: true,
          },
        ],
      },
    ];
  }
  linkResult.fields = [
    ...labelFields,
    ...linkResult.fields,
    ...linkTypes,
    {
      type: "row",
      fields: [
        {
          name: "newTab",
          label: {
            en: "Open in new tab",
            fr: "Ouvrir dans un nouvel onglet",
            pt: "Abrir num novo separador",
          },
          type: "checkbox",
        },
      ],
    },
  ];

  return deepmerge(linkResult, overrides);
};

export default link;
