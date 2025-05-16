import { socialMediaOptions, link, linkArray } from "@commons-ui/payload";

const linkField = link({
  disableOpenInNewTab: true,
});

const NavigationTab = {
  label: "Navigation",
  fields: [
    {
      name: "primaryNavigation",
      type: "group",
      localized: true,
      fields: [
        {
          type: "collapsible",
          label: "Title & Links",
          fields: [
            linkArray({
              overrides: {
                name: "menus",
                labels: {
                  singular: {
                    en: "Menu",
                  },
                  plural: {
                    en: "Menus",
                  },
                },
                fields: [linkField],
                admin: {
                  className: "array-field-nested",
                },
              },
            }),
            {
              name: "connect",
              type: "select",
              options: socialMediaOptions,
            },
          ],
        },
      ],
    },
    {
      name: "secondaryNavigation",
      type: "group",
      localized: true,
      fields: [
        {
          type: "collapsible",
          label: "Title & Links",
          fields: [
            linkArray({
              overrides: {
                name: "menus",
                labels: {
                  singular: {
                    en: "Menu",
                  },
                  plural: {
                    en: "Menus",
                  },
                },
                fields: [linkField],
                admin: {
                  className: "array-field-nested",
                },
              },
            }),
          ],
        },
      ],
    },
  ],
};

export default NavigationTab;
