import { array } from "payload/dist/fields/validations";

const FocalCountries = {
  slug: "focal-countries",
  label: {
    en: "Focal Countries",
    fr: "Pays Cibles",
    pt: "Países Foco",
  },
  access: {
    read: () => true,
  },
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
      type: "richText",
      localized: true,
      required: true,
      admin: {
        elements: ["h2", "h3", "h4", "h5", "h6", "ol", "ul", "link"],
      },
    },
    {
      name: "countries",
      label: {
        en: "Countries",
        ft: "Pays",
        pt: "Países",
      },
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "code",
              label: {
                en: "Code",
                pt: "Code",
              },
              type: "text",
              required: true,
              validate: (val, options) => {
                const { data, t } = options || {};
                if (
                  data?.countries?.filter((c) => c.code === val)?.length > 1
                ) {
                  return t("charterafrica.site:uniqueCountries");
                }
                return array(val, options);
              },
              admin: {
                width: "50%",
              },
            },
            {
              name: "coordinates",
              label: {
                en: "Coordinates",
              },
              type: "point",
              required: true,
              admin: {
                width: "50%",
              },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "name",
              label: {
                en: "Name",
              },
              type: "text",
              unique: true,
              required: true,
              localized: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "items",
              label: {
                en: "Data",
              },
              type: "array",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "name",
                      label: {
                        en: "Name",
                      },
                      type: "text",
                      required: true,
                      localized: true,
                      admin: {
                        width: "50%",
                      },
                    },
                    {
                      name: "color",
                      label: {
                        en: "Color",
                      },
                      type: "text",
                      required: true,
                      admin: {
                        width: "50%",
                      },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "value",
                      label: {
                        en: "Value",
                      },
                      type: "number",
                      required: true,
                      admin: {
                        width: "50%",
                      },
                    },
                    {
                      name: "total",
                      label: {
                        en: "Total",
                      },
                      type: "number",
                      required: true,
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
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data }) => {
            return data?.name || data?.code || data?.id;
          },
        },
      },
    },
    {
      name: "link",
      label: {
        en: "Link",
      },
      type: "group",
      fields: [
        {
          name: "content",
          label: {
            en: "Content",
          },
          type: "text",
          required: true,
          localized: true,
        },
      ],
    },
  ],
};

export default FocalCountries;
