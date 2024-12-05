import formInputFieldGroup from "#civicsignalblog/payload/fields/formInputFieldGroup";
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
        formInputFieldGroup({
          label: "E-mail",
          name: "email",
          defaultLabelValue: "Email",
          defaultErrorMessage: "You need to enter your email address.",
        }),
        formInputFieldGroup({
          label: "Password",
          name: "password",
          defaultLabelValue: "Password",
          defaultErrorMessage: "You need to enter your password.",
        }),
      ],
    },
    {
      type: "collapsible",
      label: "Form Messages",
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
  ],
};

export default LoginTab;
