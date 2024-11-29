import richText from "#civicsignalblog/payload/fields/richText";

const RegisterTab = {
  label: "Registration Form",
  fields: [
    {
      type: "collapsible",
      label: "Title & Description",
      fields: [
        {
          name: "signUpFormTitle",
          label: "Title",
          type: "text",
          defaultValue: "Sign Up",
          required: true,
          localized: true,
        },
        {
          name: "signUpIntro",
          label: "Intro",
          type: "text",
          defaultValue: "Create an account to use all our tools for free.",
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
          name: "signUpEmail",
          label: "Email",
          type: "text",
          defaultValue: "Email",
          required: true,
          localized: true,
        },
        {
          name: "signUpFullName",
          label: "Full Name",
          type: "text",
          defaultValue: "Full Name",
          required: true,
          localized: true,
        },
        {
          name: "signUpPasssword",
          label: "Password",
          type: "text",
          defaultValue: "Password",
          required: true,
          localized: true,
        },
        {
          name: "notes",
          type: "text",
          defaultValue: "Notes",
          required: true,
          localized: true,
        },
        richText({
          name: "consent",
          required: true,
          localized: true,
        }),
        {
          name: "signUpButton",
          type: "text",
          defaultValue: "Sign up",
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
          name: "signUpMissingEmail",
          type: "text",
          defaultValue: "You need to enter your email address.",
          required: true,
          localized: true,
        },
        {
          name: "signUpMissingName",
          type: "text",
          defaultValue: "You need to enter your full name.",
          required: true,
          localized: true,
        },
        {
          name: "signUpMissingPassword",
          type: "text",
          defaultValue: "You need to enter your password.",
          required: true,
          localized: true,
        },
        {
          name: "signUpMissingConsent",
          type: "text",
          defaultValue: "You must agree to our Terms and Policies",
          required: true,
          localized: true,
        },
        {
          name: "signUpFeedback",
          type: "text",
          defaultValue: "Successfully signed up.",
          required: true,
          localized: true,
        },
        {
          name: "signUpNotesHint",
          type: "text",
          defaultValue:
            "Tell us a little about what you want to use Media Cloud for",
          required: true,
          localized: true,
        },
        richText({
          name: "userAlreadyExists",
          required: true,
          localized: true,
        }),
        richText({
          name: "signupSuccess",
          required: true,
          localized: true,
        }),
      ],
    },
  ],
};

export default RegisterTab;
