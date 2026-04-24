import BannerBlock from "./BannerBlock";

import { linkGroup } from "@/commons-ui/payload/fields";

const PageHeader = BannerBlock(
  "page-header",
  "/images/cms/blocks/page-header.png",
  {
    fields: [
      {
        name: "hasBackButton",
        type: "checkbox",
      },
      linkGroup({
        overrides: {
          name: "backButton",
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.hasBackButton),
          },
        },
      }),
    ],
  },
);

export default PageHeader;
