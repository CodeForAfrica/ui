import PostTab from "./PostTab";

import canRead from "#civicsignalblog/payload/access/applications/research";

const Publication = {
  slug: "settings-publication",
  label: "Publication",
  access: {
    read: canRead,
  },
  admin: {
    group: "Settings",
  },
  fields: [
    {
      type: "tabs",
      tabs: [PostTab],
    },
  ],
};

export default Publication;
