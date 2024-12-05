import formInputFieldGroup from "#civicsignalblog/payload/fields/formInputFieldGroup";
import richText from "#civicsignalblog/payload/fields/richText";

const RegisterTab = {
  label: "Registration Form",
  fields: [
    {
      type: "collapsible",
      label: "Title & Description",
      fields: [
        {
          name: "title",
          type: "text",
          defaultValue: "Sign Up",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "text",
          defaultValue: "Create an account to use all our tools for free.",
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
        formInputFieldGroup({
          label: "Full Name",
          name: "fullName",
          includeErrorMessageField: false,
          defaultLabelValue: "Full Name",
        }),
        formInputFieldGroup({
          label: "Password",
          name: "password",
          defaultLabelValue: "Password",
          defaultErrorMessage: "You need to enter your password.",
          additionalFields: [
            {
              name: "passwordsMismatch",
              type: "text",
              required: true,
              defaultValue: "You need to enter your password.",
              localized: true,
            },
            {
              name: "passwordTooShort",
              type: "text",
              required: true,
              defaultValue: "Passwords must be at least 8 characters long.",
              localized: true,
            },
          ],
        }),
        formInputFieldGroup({
          label: "Confirm Password",
          name: "confirmPassword",
          defaultLabelValue: "Confirm Password",
          includeErrorMessageField: false,
        }),
        formInputFieldGroup({
          label: "Notes",
          name: "notes",
          defaultHint:
            "Tell us a little about what you want to use Media Cloud for",
          defaultLabelValue: "Notes",
          defaultErrorMessage:
            "You have to tell us a little about why you want to use Media Cloud.",
          includeHintField: true,
        }),
        {
          type: "collapsible",
          label: "Consent",
          fields: [
            richText({
              name: "consentLabel",
              label: "Label",
              required: true,
              localized: true,
            }),
            {
              name: "consentError",
              type: "text",
              defaultValue: "You must agree to our Terms and Policies",
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
          name: "successFeedback",
          type: "text",
          defaultValue: "Successfully signed up.",
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
    {
      type: "collapsible",
      label: "Buttons",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "signUpButton",
              type: "text",
              defaultValue: "Sign Up",
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
  ],
};

export default RegisterTab;
