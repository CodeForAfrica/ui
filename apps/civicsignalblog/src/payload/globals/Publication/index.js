import canRead from "../../access/applications/research";

import PostTab from "./PostTab";

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
