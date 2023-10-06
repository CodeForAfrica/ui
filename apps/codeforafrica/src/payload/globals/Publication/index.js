import PostsTab from "./PostsTab";

const Publication = {
  slug: "publication",
  label: "Publication",
  access: {
    read: () => true,
  },
  admin: {
    group: "Website",
  },
  fields: [
    {
      type: "tabs",
      tabs: [PostsTab],
    },
  ],
};

export default Publication;
