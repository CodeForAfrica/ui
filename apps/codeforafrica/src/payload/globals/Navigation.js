import link from "../fields/links/link";
import linkArray from "../fields/links/linkArray";

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
  ],
};

export default Navigation;
