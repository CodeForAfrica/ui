import image from "../../fields/image";

const DataPanels = {
  label: "Data Panels",
  fields: [
    {
      name: "items",
      type: "array",
      label: "Panel Items",
      required: true,
      fields: [
        {
          type: "select",
          name: "value",
          label: "Value",
          options: [
            { value: "rich-data", label: "Rich Data" },
            { value: "pin", label: "Pin" },
          ],
          localized: true,
        },
        image({
          overrides: {
            name: "icon",
            required: true,
          },
        }),
      ],
    },
    {
      type: "group",
      label: "Labels",
      name: "labels",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "scrollToTop",
              type: "text",
              label: "Scroll To Top",
              defaultValue: "Scroll To Top",
              admin: {
                width: "50%",
              },
              localized: true,
            },
            {
              name: "dataNotAvailable",
              type: "text",
              label: "Data Not Available",
              defaultValue: "DATA NOT AVAILABLE",
              admin: {
                width: "50%",
              },
              localized: true,
            },
          ],
        },
      ],
    },
  ],
};

export default DataPanels;
