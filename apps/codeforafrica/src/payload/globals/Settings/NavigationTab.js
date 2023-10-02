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
      label: "Primary Navigation",
      fields: [
        {
          type: "collapsible",
          label: "Title & Links",
          fields: [
            linkArray({
              overrides: {
                name: "menus",
                label: "Menus",
                labels: {
                  singular: "Menu",
                  plural: "Menus",
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
              label: "Connect",
              options: socialMediaOptions,
            },
          ],
        },
      ],
    },
    {
      name: "secondaryNavigation",
      type: "group",
      label: "Secondary Navigation",
      fields: [
        {
          type: "collapsible",
          label: "Title & Links",
          fields: [
            linkArray({
              overrides: {
                name: "menus",
                label: "Menus",
                labels: {
                  singular: "Menu",
                  plural: "Menus",
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
