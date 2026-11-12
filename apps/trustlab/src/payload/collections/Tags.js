import { slug } from "@commons-ui/payload/fields";

import { anyone } from "@/trustlab/payload/access";

const Tags = {
  slug: "tags",
  access: {
    read: anyone,
  },
  admin: {
    group: "Publication",
    useAsTitle: "name",
    defaultColumns: ["name", "slug"],
    hideAPIURL: true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    slug({ fieldToUse: "name" }),
  ],
};

export default Tags;
