import { deepmerge } from "@mui/utils";

const link = ({ disableLabel = false, overrides = {} } = {}) => {
  const linkResult = {
    type: "row",
    fields: [
      {
        type: "row",
        fields: [
          {
            name: "type",
            type: "radio",
            options: [
              {
                label: {
                  en: "Internal link",
                  fr: "Lien interne",
                  pt: "Link interno",
                },
                value: "reference",
              },
              {
                label: {
                  en: "Custom URL",
                  fr: "URL personnalisée",
                  pt: "URL personalizado",
                },
                value: "custom",
              },
            ],
            defaultValue: "reference",
            admin: {
              layout: "horizontal",
              width: "50%",
            },
          },
          {
            name: "newTab",
            label: {
              en: "Open in new tab",
              fr: "Ouvrir dans un nouvel onglet",
              pt: "Abrir num novo separador",
            },
            type: "checkbox",
            admin: {
              width: "50%",
              style: {
                alignSelf: "flex-end",
              },
            },
          },
        ],
      },
    ],
  };

  const linkTypes = [
    {
      name: "reference",
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
        condition: (_, siblingData) => siblingData?.type === "reference",
      },
    },
    {
      name: "href",
      label: {
        en: "Custom URL",
        fr: "URL personnalisée",
        pt: "URL personalizado",
      },
      type: "text",
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === "custom",
      },
    },
  ];

  if (!disableLabel) {
    linkTypes[0].admin.width = "50%";
    linkTypes[1].admin.width = "50%";

    linkResult.fields.push({
      type: "row",
      fields: [
        ...linkTypes,
        {
          name: "label",
          label: {
            en: "Label",
            pt: "Rótulo",
          },
          type: "text",
          required: true,
          localized: true,
          admin: {
            width: "50%",
          },
        },
      ],
    });
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes];
  }

  return deepmerge(linkResult, overrides);
};

export default link;
