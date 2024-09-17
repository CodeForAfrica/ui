import { deepmerge } from "@mui/utils";
import { select } from "node_modules/payload/dist/fields/validations";

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
      initCollapsed: true,
    },
    fields: [
      {
        name: "platform",
        type: "select",
        label: "Platform",
        options: socialMediaOptions,
        required: true,
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
