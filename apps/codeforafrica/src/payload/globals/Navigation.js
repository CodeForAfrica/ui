import { array } from "payload/dist/fields/validations";

import link from "../fields/links/link";
import linkArray from "../fields/links/linkArray";

const socialMediaOptions = [
  "facebook",
  "twitter",
  "instagram",
  "linkedin",
  "github",
  "slack",
];

const linkField = link({
  disableOpenInNewTab: true,
});
const Navigation = {
  slug: "navigation",
  label: {
    en: "Navigation",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "logo",
      label: {
        en: "Logo",
      },
      type: "group",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
          label: {
            en: "Image",
          },
        },
        link({
          disableLabel: true,
          disableLinkTypeSelection: true,
          disableOpenInNewTab: true,
        }),
      ],
      admin: {
        hideGutter: true,
        initCollapsed: true,
      },
    },
    linkArray({
      overrides: {
        name: "menus",
        fields: [linkField],
      },
    }),
    {
      name: "socialLinks",
      label: "Social Media Links",
      type: "array",
      minRows: 1,
      admin: {
        components: {
          RowLabel: ({ data }) => {
            return (
              data.platform.charAt(0).toUpperCase() + data.platform.slice(1)
            );
          },
        },
      },
      fields: [
        {
          name: "platform",
          label: "Platform",
          type: "select",
          options: socialMediaOptions.map((platform) => ({
            label: platform.charAt(0).toUpperCase() + platform.slice(1),
            value: platform,
          })),
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
    },
  ],
};

export default Navigation;
