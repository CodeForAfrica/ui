import { slateEditor } from "@payloadcms/richtext-slate";

import image from "../../fields/image";
import LocationSelect, { validateLocation } from "../../fields/LocationSelect";
import richText from "../../fields/richText";

const HURUMap = {
  slug: "settings-hurumap",
  label: "HURUMap",
  description: "HURUMap Configuration",
  access: {
    read: () => true,
  },
  admin: {
    group: "Settings",
    hideAPIURL: true,
  },
  fields: [
    {
      name: "page",
      label: "Explore Page",
      type: "relationship",
      relationTo: ["pages"],
      maxDepth: 1,
      required: true,
      admin: {
        description:
          "The page to use as the Explore page. It will contain the interactive map.",
      },
    },
    {
      name: "initialLocation",
      label: {
        en: "Initial Location",
      },
      type: "group",
      localized: true,
      fields: [
        {
          name: "name",
          type: "text",
          label: {
            en: "Name",
          },
          localized: true,
          required: true,
          hasMany: false,
          defaultValue: "af",
          validate: validateLocation,
          admin: {
            components: {
              Field: LocationSelect,
            },
          },
        },
        {
          name: "center",
          label: "Center Point",
          type: "point",
          defaultValue: [20.0, 4.25],
        },
        {
          name: "pinInitialLocation",
          type: "checkbox",
          localized: true,
          label: {
            en: "Allow pinning of initial location",
          },
          defaultValue: false,
        },
      ],
    },
    {
      name: "tutorialPanel",
      label: {
        en: "Tutorial Panel",
      },
      type: "group",
      localized: true,
      fields: [
        {
          name: "items",
          label: {
            en: "Items",
          },
          type: "array",
          localized: true,
          required: true,
          admin: {
            components: {
              initCollapsed: true,
              RowLabel: ({ data, index }) => {
                return data?.title || `Item ${String(index).padStart(2, "0")}`;
              },
            },
          },
          fields: [
            {
              name: "title",
              label: {
                en: "Title",
              },
              type: "text",
              localized: true,
              required: true,
            },
            richText({
              name: "description",
              label: {
                en: "Description",
              },
              editor: slateEditor({
                admin: {
                  elements: [
                    "h3",
                    "h4",
                    "h5",
                    "h6",
                    "link",
                    "ol",
                    "ul",
                    "indent",
                  ],
                  leaves: ["bold", "code", "italic", "underline"],
                },
              }),
              required: true,
              localized: true,
            }),
            {
              name: "selector",
              label: {
                en: "Selector",
              },
              type: "text",
              localized: true,
              required: true,
              admin: {
                description: "CSS selector for the element to highlight",
              },
            },
            image({
              overrides: {
                name: "image",
                required: true,
              },
            }),
          ],
        },
      ],
    },
  ],
};

export default HURUMap;
