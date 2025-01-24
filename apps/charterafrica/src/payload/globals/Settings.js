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
    {
      name: "analytics",
      type: "group",
      label: "Site Analytics",
      localized: true,
      fields: [
        {
          type: "collapsible",
          label: "Google Analytics",
          fields: [
            {
              name: "analyticsId",
              type: "text",
              defaultValue: "G-5ZPEFLT0NJ", // From .env
            },
          ],
          admin: {
            description:
              "Measurement ID: https://support.google.com/analytics/answer/12270356",
          },
        },
      ],
    },
  ],
};

export default Settings;
