import link from "../fields/link";
import linkArray from "../fields/linkArray";

const linkField = link();
linkField.fields.push({
  type: "row",
  fields: [
    linkArray({
      overrides: {
        name: "children",
        label: {
          en: "Submenus",
          fr: "Sous-menus",
        },
        labels: {
          singular: {
            en: "Submenu",
            fr: "Sous-menu",
          },
          plural: {
            en: "Submenus",
            fr: "Sous-menus",
          },
        },
      },
    }),
  ],
});

const Navigation = {
  slug: "navigation",
  label: {
    en: "Navigation",
    fr: "La navigation",
    pt: "Navegação",
  },
  access: {
    read: () => true,
  },
  fields: [
    linkArray({
      overrides: {
        name: "menus",
        fields: [linkField],
      },
    }),
    {
      label: {
        en: "Actions",
        pt: "Acções",
      },
      type: "collapsible",
      fields: [
        {
          name: "actions",
          type: "group",
          label: {
            en: "Search & Join",
            fr: "Recherches & Rejoignez",
            pt: "Busca & Participar",
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "search",
                  type: "group",
                  label: {
                    en: "Search",
                    fr: "Recherches",
                    pt: "Busca",
                  },
                  fields: [
                    {
                      name: "enabled",
                      type: "checkbox",
                      label: {
                        en: "Enable",
                        ft: "Activer",
                        pt: "Ativar",
                      },
                      defaultValue: false,
                    },
                    {
                      name: "placeholder",
                      label: {
                        en: "Placeholder",
                        fr: "Espace Réservé",
                        pt: "Espaço Reservado",
                      },
                      type: "text",
                      required: true,
                      localized: true,
                      admin: {
                        condition: (_, siblingData) => siblingData?.enabled,
                      },
                    },
                  ],
                  admin: {
                    hideGutter: true,
                  },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "join",
                  type: "group",
                  label: {
                    en: "Join",
                    fr: "Rejoignez",
                    pt: "Participar",
                  },
                  fields: [
                    {
                      name: "enabled",
                      type: "checkbox",
                      label: {
                        en: "Enable",
                        pt: "Ativar",
                      },
                      defaultValue: false,
                    },
                    {
                      name: "label",
                      label: {
                        en: "Label",
                      },
                      type: "text",
                      required: true,
                      localized: true,
                      admin: {
                        condition: (_, siblingData) => siblingData?.enabled,
                      },
                    },
                  ],
                  admin: {
                    hideGutter: true,
                  },
                },
              ],
            },
          ],
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};

export default Navigation;
