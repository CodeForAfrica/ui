import link from "../fields/link";

const linkField = link();
linkField.fields.push({
  type: "row",
  fields: [
    {
      name: "children",
      type: "array",
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
      fields: [link()],
    },
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
    {
      name: "menus",
      type: "array",
      fields: [linkField],
    },
  ],
};

export default Navigation;
