import { deepmerge } from "@mui/utils";
import select from "payload";

import url from "./url";
import { Field } from "payload";

export const socialMediaOptions = [
  "Facebook",
  "Twitter",
  "Instagram",
  "Linkedin",
  "Github",
  "Slack",
];

type Overrides = {
  name: string;
} & Partial<Field>;

function socialLinks(overrides: Overrides = { name: "links" }) {
  const defaults: Field = {
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
        RowLabel: "@/roboshield/payload/components/RowLabel.tsx",
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
          const { name: linksName = "links" } = overrides as Overrides;
          if (
            data?.[linksName]?.filter((l: any) => l.platform === val)?.length >
            1
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
