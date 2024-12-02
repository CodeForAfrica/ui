function formInputFields({ minRows, maxRows, validate }) {
  return {
    name: "fields",
    type: "array",
    label: "Form input fields",
    minRows,
    maxRows,
    validate,
    labels: {
      singular: "Field",
      plural: "Fields",
    },
    admin: {
      className: "array-field-nested",
      components: {
        RowLabel: ({ data, index }) => {
          let label = "";
          if (data.name) {
            label = data.name;
          }
          if (!label) {
            label = `Field ${String(index).padStart(2, "0")}`;
          }
          return label;
        },
      },
      initCollapsed: true,
    },
    fields: [
      {
        type: "row",
        fields: [
          {
            name: "name",
            type: "text",
            required: true,
          },
          {
            name: "label",
            type: "text",
            required: true,
          },
        ],
      },
      {
        type: "row",
        fields: [
          {
            name: "errorMessage",
            type: "text",
            required: true,
          },
          {
            name: "hint",
            type: "text",
          },
        ],
      },
    ],
  };
}

export default formInputFields;
