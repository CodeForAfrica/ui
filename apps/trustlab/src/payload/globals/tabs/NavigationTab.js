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
            {
              name: "title",
              type: "text",
              localized: true,
            },
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
                  components: {
                    RowLabel: {
                      path: "@/trustlab/payload/components/RowLabel",
                      clientProps: {
                        label: "label",
                      },
                    },
                  },
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
            {
              name: "title",
              type: "text",
              localized: true,
            },
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
                  components: {
                    RowLabel: {
                      path: "@/trustlab/payload/components/RowLabel",
                      clientProps: {
                        label: "label",
                      },
                    },
                  },
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
