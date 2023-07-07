import defaultValue from "../utils/defaultValues";

const CommonLabels = {
  slug: "common-labels",
  access: {
    read: () => true,
  },
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
            {
              name: "show",
              label: {
                en: "Show",
                fr: "Montrer",
                pt: "Mostrar",
              },
              defaultValue: defaultValue({
                en: "Show",
                fr: "Montrer",
                pt: "Mostrar",
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
};

export default CommonLabels;
