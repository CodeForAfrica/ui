const LoginTab = {
  label: "Login Form",
  fields: [
    {
      type: "collapsible",
      label: "Title & Description",
      fields: [
        {
          name: "title",
          type: "text",
          defaultValue: "Login",
          required: true,
          localized: true,
        },
      ],
    },
    {
      type: "collapsible",
      label: "Fields",
      fields: [
        {
          name: "fields",
          type: "array",
          label: "Form input fields",
          minRows: 2,
          maxRows: 2,
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
              name: "name",
              type: "text",
            },
            {
              name: "label",
              type: "text",
            },
            {
              name: "errorMessage",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};

export default LoginTab;
