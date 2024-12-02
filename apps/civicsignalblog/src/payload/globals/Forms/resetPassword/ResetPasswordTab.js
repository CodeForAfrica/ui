const ResetPassword = {
  label: "Reset Password Form",
  fields: [
    {
      type: "collapsible",
      label: "Title & Description",
      fields: [
        {
          name: "title",
          type: "text",
          defaultValue: "Forgot Your Password?",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "text",
          defaultValue:
            "Enter your email address and we will send you a link to reset your password.",
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
          minRows: 1,
          maxRows: 1,
          validate: (val, args) => {
            if (val.length < args.minRows)
              return `You must add ${args.minRows} form input fields`;

            if (!val.some((field) => field.name === "email")) {
              return "Login form must have a field with email as name";
            }
            return true;
          },
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
              name: "passwordResetButton",
              type: "text",
              defaultValue: "Send Password Reset Email",
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
          name: "passwordResetFailed",
          type: "text",
          defaultValue: "Sorry, something went wrong.",
          required: true,
        },
        {
          name: "passwordResetSuccessTitle",
          type: "text",
          defaultValue: "We Reset Your Password",
          required: true,
          localized: true,
        },
        {
          name: "passwordResetSuccessDescription",
          type: "text",
          defaultValue:
            "We have reset your password. We emailed you just to confirm that you did this on purpose - don't be suprised.",
          required: true,
          localized: true,
        },
      ],
    },
  ],
};

export default ResetPassword;
