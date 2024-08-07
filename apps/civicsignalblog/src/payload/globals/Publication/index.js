import PostTab from "./PostTab";

const Publication = {
  slug: "settings-publication",
  label: "Publication",
  access: {
    read: () => true,
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
