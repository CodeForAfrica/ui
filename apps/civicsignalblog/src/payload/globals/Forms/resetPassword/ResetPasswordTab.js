import formInputFieldGroup from "#civicsignalblog/payload/fields/formInputFieldGroup";

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
        formInputFieldGroup({
          label: "E-mail",
          name: "email",
          defaultLabelValue: "Email",
          defaultErrorMessage: "You need to enter a valid email address.",
        }),
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
  ],
};

export default ResetPassword;
