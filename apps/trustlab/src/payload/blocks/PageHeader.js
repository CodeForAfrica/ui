import BannerBlock from "./BannerBlock";

const PageHeader = BannerBlock(
  "page-header",
  "/images/cms/blocks/page-header.png",
  {
    fields: [
      {
        name: "isPageHeader",
        type: "checkbox",
        defaultValue: true,
        virtual: true,
        admin: {
          hidden: true,
        },
      },
    ],
  },
);

export default PageHeader;
