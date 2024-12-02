import formInputFields from "#civicsignalblog/payload/fields/formInputFields";
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
        formInputFields({
          minRows: 2,
          maxRows: 2,
          validate: (val, args) => {
            if (val.length < args.minRows)
              return `You must add ${args.minRows} form input fields`;

            if (!val.some((field) => field.name === "email")) {
              return "Login form must have a field with email as name";
            }

            if (!val.some((field) => field.name === "password")) {
              return "Login form must have a field with password as name";
            }
            return true;
          },
        }),
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
              name: "loginButton",
              type: "text",
              defaultValue: "Login",
              required: true,
              localized: true,
            },
            {
              name: "registrationButton",
              type: "text",
              defaultValue: "No Account ? Register Now!",
              required: true,
              localized: true,
            },
            {
              name: "forgotPasswordButton",
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
          name: "loginFailed",
          type: "text",
          defaultValue: "Your email or password was wrong.",
          required: true,
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
