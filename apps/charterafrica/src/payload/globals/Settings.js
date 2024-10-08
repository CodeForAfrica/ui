import { locales } from "../utils/locales";
import validateUniqueArrayFieldSelect from "../utils/validateUniqueArrayFieldSelect";

const Settings = {
  slug: "settings",
  label: {
    en: "Settings",
    fr: "Paramètres",
    pt: "Configurações",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: {
        en: "Title & description",
        fr: "Titre & description",
        pt: "Titulo & descrição",
      },
      type: "collapsible",
      fields: [
        {
          name: "title",
          label: {
            en: "Title",
            fr: "Titre",
            pt: "Título",
          },
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "description",
          label: {
            en: "Description",
            pt: "Descrição",
          },
          type: "textarea",
          localized: true,
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      label: {
        en: "Languages",
        ft: "Langues",
        pt: "Idiomas",
      },
      type: "collapsible",
      fields: [
        {
          name: "languages",
          label: {
            en: "Languages",
            ft: "Langues",
            pt: "Idiomas",
          },
          type: "array",
          fields: [
            {
              name: "locale",
              label: {
                en: "Locale",
                pt: "Localidade",
              },
              type: "select",
              options: locales,
              unique: true,
              required: true,
              admin: {
                isClearable: false,
                isSortable: true,
              },
              validate: validateUniqueArrayFieldSelect(
                "languages",
                "locale",
                locales,
                "charterafrica.site:uniqueLocales",
              ),
            },
            {
              name: "label",
              label: {
                en: "Label",
                pt: "Rótulo",
              },
              type: "text",
              required: true,
            },
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: ({ data }) => {
                return data?.label || data?.locale || data?.id;
              },
            },
          },
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};

export default Settings;
