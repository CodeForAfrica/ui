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
        {
          name: "align",
          type: "text",
          label: "Align",
          localized: true,
          defaultValue: "",
          admin: {
            width: "50%",
          },
        },
        {
          name: "anchor",
          type: "text",
          label: "Anchor",
          localized: true,
          defaultValue: "",
          admin: {
            width: "50%",
          },
        },
        {
          name: "blockUniqueClass",
          type: "text",
          label: "Block Unique Class",
          defaultValue: "lazyblock-panel-20amuc",
          localized: true,
          admin: {
            width: "50%",
          },
        },
        {
          name: "ghostkitSpacings",
          type: "text",
          label: "Ghostkit Spacings",
          defaultValue: "",
          localized: true,
          admin: {
            width: "50%",
          },
        },
        {
          name: "ghostkitSR",
          type: "text",
          label: "Ghostkit SR",
          localized: true,
          defaultValue: "",
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      name: "lazyblock",
      type: "group",
      label: "Lazy Block",
      fields: [
        {
          name: "slug",
          type: "text",
          label: "Slug",
          defaultValue: "lazyblock/panel",
          localized: true,
        },
      ],
    },
  ],
};

export default PanelOptions;
