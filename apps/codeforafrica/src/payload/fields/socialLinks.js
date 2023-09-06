import { deepmerge } from "@mui/utils";
import { array } from "payload/dist/fields/validations";

const socialMediaOptions = [
  "Facebook",
  "Twitter",
  "Instagram",
  "Linkedin",
  "Github",
  "Slack",
];

function socialLinks(overrides) {
  const field = {
    name: "socialLinks",
    label: "Social Media Links",
    type: "array",
    minRows: 1,
    admin: {
      components: {
        RowLabel: ({ data }) => {
          return data.platform;
        },
      },
    },
    fields: [
      {
        name: "platform",
        label: "Platform",
        type: "select",
        options: socialMediaOptions,
        required: true,
        validate: (val, options) => {
          const { data } = options || {};
          if (
            data?.socialLinks?.filter((l) => l.platform === val)?.length > 1
          ) {
            return "Please select a unique platform";
          }
          return array(val, options);
        },
      },
      {
        name: "url",
        label: "URL",
        type: "text",
        required: true,
      },
    ],
  };
  return deepmerge(field, overrides);
}

export default socialLinks;
