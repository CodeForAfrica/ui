import { deepmerge } from "@mui/utils";
import { array } from "payload/dist/fields/validations";

import url from "./url";

const socialMediaOptions = [
  "Facebook",
  "Twitter",
  "Instagram",
  "Linkedin",
  "Github",
  "Slack",
];

function socialLinks(overrides) {
  const defaults = {
    name: "links",
    type: "array",
    label: "Links",
    labels: {
      singular: "Link",
      plural: "Links",
    },
    minRows: 1,
    admin: {
      className: "array-field-nested",
      components: {
        RowLabel: ({ data, index }) => {
          let label = "";
          if (data.platform) {
            label = data.platform;
          }
          if (data.url) {
            label = label ? `${label} (${data.url})` : data.url;
          }
          if (!label) {
            label = `Link ${String(index).padStart(2, "0")}`;
          }
          return label;
        },
      },
      initCollapsed: true,
    },
    fields: [
      {
        name: "platform",
        type: "select",
        label: "Platform",
        options: socialMediaOptions,
        required: true,
        validate: (val, options) => {
          const { data } = options || {};
          if (data?.links?.filter((l) => l.platform === val)?.length > 1) {
            return "Please select a unique platform";
          }
          return array(val, options);
        },
      },
      url({
        overrides: {
          required: true,
        },
      }),
    ],
  };
  return deepmerge(defaults, overrides);
}

export default socialLinks;
