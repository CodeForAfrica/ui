import link from "../fields/link";
import linkGroup from "../fields/linkGroup";
import formatPagePath from "../utils/formatPagePath";

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

const insertHrefIfReference = (menu) => {
  if (menu.reference) {
    const { relationTo: collection, value: doc } = menu.reference;
    const href = formatPagePath(collection, doc);
    return { ...menu, href };
  }
  return menu;
};

const insertHref = (menus) => {
  if (!menus?.length) {
    return null;
  }
  return menus.map((originalMenu) => {
    const menu = insertHrefIfReference(originalMenu);
    const children = insertHref(originalMenu.children);
    return { ...menu, children };
  });
};

const afterReadInsertHrefHook = (args) => {
  const { doc } = args;
  if (doc.menus) {
    const { menus: originalMenus } = doc;
    const menus = insertHref(originalMenus);
    return { ...doc, menus };
  }
  return doc;
};

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
    afterRead: [afterReadInsertHrefHook],
  },
};

export default Navigation;
