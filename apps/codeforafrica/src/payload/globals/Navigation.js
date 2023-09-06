import link from "../fields/links/link";
import menus from "../fields/menus";
import socialLinks from "../fields/socialLinks";

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
    menus(),
    socialLinks(),
  ],
};

export default Navigation;
