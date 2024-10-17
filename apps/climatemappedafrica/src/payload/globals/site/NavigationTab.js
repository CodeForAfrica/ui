import link from "../../fields/links/link";
import linkArray from "../../fields/links/linkArray";
import { socialMediaOptions } from "../../fields/socialLinks";

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
              hasMany: true,
              options: socialMediaOptions,
            },
          ],
        },
      ],
    },
    {
      name: "footerNavigation",
      type: "group",
      localized: true,
      fields: [
        {
          type: "text",
          name: "title",
          required: true,
          localized: true,
          label: "Title",
        },
        {
          type: "collapsible",
          label: "Links",
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
