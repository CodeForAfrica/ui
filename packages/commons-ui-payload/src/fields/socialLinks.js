import { deepmerge } from "@mui/utils";
// eslint-disable-next-line import/no-unresolved
import { select } from "payload/shared";

import url from "@/commons-ui/payload/fields/url";

export const socialMediaOptions = [
  "Facebook",
  "Twitter",
  "Instagram",
  "Linkedin",
  "Github",
  "Slack",
];

function socialLinks(overrides = {}) {
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
        RowLabel: "@/trustlab/payload/components/RowLabel",
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
