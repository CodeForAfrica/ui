import formInputFields from "#civicsignalblog/payload/fields/formInputFields";
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
        formInputFields({
          minRows: 5,
          maxRows: 5,
          validate: (val, args) => {
            if (val.length < args.minRows)
              return `You must add ${args.minRows} form input fields`;

            const requiredFields = [
              "email",
              "fullname",
              "password",
              "confirm_password",
              "notes",
              "terms_of_use",
            ];

            const missingFields = requiredFields.filter(
              (fieldName) => !val.some((field) => field.name === fieldName),
            );

            if (missingFields.length > 0) {
              return `Registration form must have fields with the following names: ${missingFields.join(", ")}`;
            }

            return true;
          },
        }),
      ],
    },
    {
      type: "collapsible",
      label: "Form Messages",
      fields: [
        {
          name: "successFeedback",
          type: "text",
          defaultValue: "Successfully signed up.",
          required: true,
          localized: true,
        },
        {
          name: "passwordsMismatch",
          type: "text",
          defaultValue: "Passwords do not match.",
          required: true,
          localized: true,
        },
        {
          name: "passwordTooShort",
          type: "text",
          defaultValue: "Passwords must be at least 8 characters long..",
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
