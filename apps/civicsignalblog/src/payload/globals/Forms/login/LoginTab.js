import richText from "#civicsignalblog/payload/fields/richText";

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
              type: "row",
              fields: [
                {
                  name: "name",
                  label: "Name (lowercase, no special characters)",
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
        },
      ],
    },
    {
      type: "collapsible",
      label: "Buttons",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "login",
              type: "text",
              defaultValue: "Login",
              required: true,
              localized: true,
            },
            {
              name: "registration",
              type: "text",
              defaultValue: "No Account ? Register Now!",
              required: true,
              localized: true,
            },
            {
              name: "password",
              type: "text",
              defaultValue: "Forgot your password ?",
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Messages",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "loginFailed",
              label: "Login Failed",
              default: "Your email or password was wrong.",
              type: "text",
              required: true,
            },
          ],
        },
        richText({
          name: "needsToActivate",
          required: true,
          localized: true,
        }),
      ],
    },
  ],
};

export default LoginTab;
