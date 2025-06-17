import { nestCollectionUnderPage } from "@commons-ui/payload";

import BaseContentCollection from "./BaseContentCollection";

const Resources = BaseContentCollection("resources", {
  labels: {
    singular: {
      en: "Resource",
    },
    plural: {
      en: "Resources",
    },
  },
  hooks: {
    afterRead: [nestCollectionUnderPage("resources")],
  },
});

export default Resources;
