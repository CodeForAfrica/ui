import image from "../../fields/image";

const PanelOptions = {
  label: "Panel Options",
  fields: [
    {
      name: "items",
      type: "array",
      label: "Panel Items",
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
      type: "row",
      fields: [
        {
          name: "scrollToTopLabel",
          type: "text",
          label: "Scroll To Top Label",
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
};

export default PanelOptions;
