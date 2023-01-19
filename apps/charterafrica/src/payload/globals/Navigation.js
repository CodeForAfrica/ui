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
  ],
};

export default Navigation;
