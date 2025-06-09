import BannerBlock from "./BannerBlock";

const PageHeader = BannerBlock(
  "page-header",
  "/images/cms/blocks/page-header.png",
  {
    hooks: {
      afterRead: [({ doc }) => ({ ...doc, isPageHeader: true })],
    },
  },
);

export default PageHeader;
