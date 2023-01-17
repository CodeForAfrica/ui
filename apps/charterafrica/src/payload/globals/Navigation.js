import link from "../fields/link";
import linkGroup from "../fields/linkGroup";
import mapLinkTypeToHref from "../utils/mapLinkTypeToHref";

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

function insertHref(menus) {
  if (!menus?.length) {
    // return null since undefined is not serializable
    return null;
  }
  return menus.map((originalMenu) => {
    const menu = mapLinkTypeToHref(originalMenu);
    menu.children = insertHref(originalMenu.children);
    return menu;
  });
}

function afterReadInsertLinkHrefHook(args) {
  const { doc } = args;
  if (doc.menus) {
    const { menus: originalMenus } = doc;
    const menus = insertHref(originalMenus);
    return { ...doc, menus };
  }
  return doc;
}

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
  hooks: {
    afterRead: [afterReadInsertLinkHrefHook],
  },
};

export default Navigation;
