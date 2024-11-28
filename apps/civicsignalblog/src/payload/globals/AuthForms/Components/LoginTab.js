import richText from "#civicsignalblog/payload/fields/richText";

const LoginTab = {
  label: "Login",
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
      label: "Input Elements",
      fields: [
        {
          name: "email",
          type: "text",
          defaultValue: "Email",
          required: true,
          localized: true,
        },
        {
          name: "passsword",
          type: "text",
          defaultValue: "Password",
          required: true,
          localized: true,
        },
        {
          name: "loginButton",
          type: "text",
          defaultValue: "Login",
          required: true,
          localized: true,
        },
        {
          name: "registerButton",
          type: "text",
          defaultValue: "No Account? Register Now!",
          required: true,
          localized: true,
        },
        {
          name: "passwordResetLink",
          label: "Password Reset Button",
          type: "text",
          defaultValue: "Forgot your Password?",
          required: true,
          localized: true,
        },
      ],
    },
    {
      type: "collapsible",
      label: "Form Messages",
      fields: [
        {
          name: "missingEmail",
          type: "text",
          defaultValue: "You need to enter your email address.",
          required: true,
          localized: true,
        },
        {
          name: "missingPassword",
          type: "text",
          defaultValue: "You need to enter your password.",
          required: true,
          localized: true,
        },
        {
          name: "loginFailed",
          type: "text",
          defaultValue: "Your email or password was wrong.",
          required: true,
          localized: true,
        },
        {
          name: "loginSucceeded",
          type: "text",
          defaultValue: "You are now logged in!",
          required: true,
          localized: true,
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
