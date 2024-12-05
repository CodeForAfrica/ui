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
        formInputFieldGroup({ label: "E-mail", name: "email" }),
        formInputFieldGroup({ label: "Full Name", name: "fullName" }),
        formInputFieldGroup({
          label: "Password",
          name: "password",
          additionalFields: [
            {
              name: "passwordsMismatch",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "passwordTooShort",
              type: "text",
              required: true,
              localized: true,
            },
          ],
        }),
        formInputFieldGroup({
          label: "Confirm Password",
          name: "confirmPassword",
          includeErrorMessageField: false,
        }),
        formInputFieldGroup({
          label: "Notes",
          name: "notes",
          includeHintField: true,
        }),
        formInputFieldGroup({ label: "Consent", name: "consent" }),
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
