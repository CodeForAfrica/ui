import { deepmerge } from "@mui/utils";
import { select } from "payload/dist/fields/validations";

import url from "./url";

export const socialMediaOptions = [
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
    labels: {
      singular: {
        en: "Link",
      },
      plural: {
        en: "Links",
      },
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
        validate: (val, args) => {
          const { data, t } = args || {};
          const { name: linksName = "links" } = overrides;
          if (
            data?.[linksName]?.filter((l) => l.platform === val)?.length > 1
          ) {
            return t("codeforafrica.validation:uniquePlatforms");
          }

          const {
            hasMany,
            options = socialMediaOptions,
            required = true,
          } = args;
          return select(val, { hasMany, options, required, t });
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
