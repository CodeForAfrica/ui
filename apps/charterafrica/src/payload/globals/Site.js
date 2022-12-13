import { array } from "payload/dist/fields/validations";

import { locales } from "../utils/locales";

const Site = {
  slug: "site",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "general",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
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
          validate: (val, options) => {
            const { data, t } = options || {};
            if (data?.language?.filter((l) => l.locale === val)?.length > 1) {
              return t("charterafrica.site:uniqueLocales");
            }
            return array(val, options);
          },
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
};

export default Site;
