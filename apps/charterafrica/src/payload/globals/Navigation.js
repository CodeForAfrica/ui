import link from "../fields/link";
import linkGroup from "../fields/linkGroup";

const linkField = link();
linkField.fields.push({
  type: "row",
  fields: [
    linkGroup({
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
    linkGroup({
      overrides: {
        name: "menus",
        fields: [linkField],
      },
    }),
  ],
};

export default Navigation;
