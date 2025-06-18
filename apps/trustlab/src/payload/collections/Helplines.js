import { nestCollectionUnderPage } from "@commons-ui/payload";

import BaseContentCollection from "./BaseContentCollection";

const Helplines = BaseContentCollection("helplines", {
  hasTags: false,
  hooks: {
    afterRead: [nestCollectionUnderPage("helplines")],
  },
});

export default Helplines;
