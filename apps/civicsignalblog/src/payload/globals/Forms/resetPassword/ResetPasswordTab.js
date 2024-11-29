const ResetPassword = {
  label: "Reset Password Form",
  fields: [
    {
      type: "collapsible",
      label: "Title & Description",
      fields: [
        {
          name: "passwordResetFormTitle",
          label: "Title",
          type: "text",
          defaultValue: "Forgot Your Password?",
          required: true,
          localized: true,
        },
        {
          name: "passwordResetIntro",
          label: "Intro",
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
      label: "Input Elements",
      fields: [
        {
          name: "passwordResetEmail",
          label: "Email",
          type: "text",
          defaultValue: "Email",
          required: true,
          localized: true,
        },
        {
          name: "passwordResetButton",
          type: "text",
          defaultValue: "Send Password Reset Email",
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
          name: "passwordResetMissingEmail",
          type: "text",
          defaultValue: "Email You need to enter a valid email address.",
          required: true,
          localized: true,
        },
        {
          name: "passwordResetFailed",
          type: "text",
          defaultValue: "Sorry, something went wrong.",
          required: true,
          localized: true,
        },
        {
          name: "passwordResetBadToken",
          type: "text",
          defaultValue:
            "That is an invalid reset token. Check to see if you have a newer link from us in your email",
          required: true,
          localized: true,
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
