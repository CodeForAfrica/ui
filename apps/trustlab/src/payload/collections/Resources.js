import { nestCollectionUnderPage } from "@commons-ui/payload";

import BaseContentCollection from "./BaseContentCollection";

const Resources = BaseContentCollection("resources", {
  hooks: {
    afterRead: [nestCollectionUnderPage("resources")],
  },
});

export default Resources;
